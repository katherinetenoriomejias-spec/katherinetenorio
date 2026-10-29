/**
 * Historial de seguidores para calcular el crecimiento.
 *
 * - En producción usa Vercel Blob (token BLOB_READ_WRITE_TOKEN, que Vercel inyecta
 *   automáticamente al agregar el store).
 * - En desarrollo (sin token) usa un archivo local ./data/history.json.
 *
 * Se guarda un snapshot por día por red. El crecimiento se calcula contra el
 * snapshot más antiguo dentro de la ventana de 30 días.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface Snapshot {
  followers: number;
  at: string;
}

export interface HistoryStore {
  instagram: Snapshot[];
  tiktok: Snapshot[];
}

const WINDOW_DAYS = 30;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const empty: HistoryStore = { instagram: [], tiktok: [] };

async function readHistory(): Promise<HistoryStore> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    try {
      const { head, list } = await import('@vercel/blob');
      const items = await list({ prefix: 'social-history.json' });
      const blob = items.blobs.find((b) => b.pathname === 'social-history.json');
      if (blob) {
        const res = await fetch(blob.url);
        if (res.ok) return (await res.json()) as HistoryStore;
      }
      return empty;
    } catch {
      return empty;
    }
  }
  // Desarrollo local.
  try {
    const file = path.resolve(process.cwd(), 'public/data/history.json');
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as HistoryStore;
  } catch {
    return empty;
  }
}

async function writeHistory(store: HistoryStore): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    try {
      const { put } = await import('@vercel/blob');
      await put('social-history.json', JSON.stringify(store), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    } catch {
      /* sin token o sin red: se pierde el snapshot, pero no rompe la web */
    }
    return;
  }
  try {
    const file = path.resolve(process.cwd(), 'public/data/history.json');
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(store, null, 2), 'utf8');
  } catch {
    /* solo desarrollo: se ignora el error */
  }
}

/** Limpia snapshots más viejos que la ventana de 30 días. */
function prune(list: Snapshot[]): Snapshot[] {
  const cutoff = Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return list.filter((s) => new Date(s.at).getTime() >= cutoff);
}

/** Agrega un snapshot por día (solo uno por día por red). */
function record(list: Snapshot[], followers: number): Snapshot[] {
  const now = new Date().toISOString();
  const next = prune(list);
  const last = next[next.length - 1];
  if (last && Date.now() - new Date(last.at).getTime() < ONE_DAY_MS) {
    // Mismo día: actualiza el último snapshot.
    next[next.length - 1] = { followers, at: now };
  } else {
    next.push({ followers, at: now });
  }
  return next;
}

/** Crecimiento porcentual contra el snapshot más antiguo válido. */
function growth(list: Snapshot[], current: number): number | null {
  if (list.length < 2) return null;
  const oldest = list[0];
  if (current === oldest.followers) return null;
  if (oldest.followers === 0) return null;
  return Math.round(((current - oldest.followers) / oldest.followers) * 1000) / 10;
}

export async function updateHistory(network: 'instagram' | 'tiktok', followers: number | null): Promise<number | null> {
  if (followers === null) return null;
  const store = await readHistory();
  const before = store[network];
  const updated = record(before, followers);
  store[network] = updated;
  await writeHistory(store);
  return growth(updated, followers);
}
