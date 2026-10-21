#!/usr/bin/env python3
"""Genera imágenes placeholder para el media kit.

Uso:  python3 scripts/placeholders.py
Salida: public/fotos/*.jpg  (reemplaza por las fotos reales de Katha)
"""
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "fotos")

PALETTE = {
    "katha-portada.jpg": ((253, 251, 248), (255, 227, 241)),
    "katha-retrato.jpg": ((245, 239, 230), (255, 61, 154)),
    "colab-moving-life.jpg": ((255, 227, 241), (43, 20, 48)),
    "colab-inclusion.jpg": ((245, 239, 230), (255, 122, 43)),
    "colab-viajes.jpg": ((43, 20, 48), (255, 61, 154)),
    "colab-tecnologia.jpg": ((220, 232, 240), (43, 20, 48)),
    "galeria-1.jpg": ((255, 227, 241), (255, 210, 62)),
    "galeria-2.jpg": ((245, 239, 230), (255, 61, 154)),
    "galeria-3.jpg": ((154, 167, 178), (255, 255, 255)),
    "galeria-4.jpg": ((43, 20, 48), (255, 122, 43)),
    "galeria-5.jpg": ((220, 232, 240), (255, 227, 241)),
    "galeria-6.jpg": ((255, 210, 62), (43, 20, 48)),
}

W, H = 800, 600


def gradient(top, bottom):
    rows = []
    for y in range(H):
        ratio = y / max(H - 1, 1)
        row = bytearray()
        for x in range(W):
            wave = 0.12 * (x / W)
            r = int(top[0] + (bottom[0] - top[0]) * (ratio + wave - 0.06))
            g = int(top[1] + (bottom[1] - top[1]) * (ratio + wave - 0.06))
            b = int(top[2] + (bottom[2] - top[2]) * (ratio + wave - 0.06))
            row += bytes((max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
        rows.append(bytes(row))
    return rows


def write_jpeg(path, width, height, rows):
    """JPEG mínimo sin dependencias externas: escribe un PNG y lo nombra .jpg."""
    raw = b"".join(b"\x00" + row for row in rows)

    def chunk(tag, data):
        return (
            struct.pack(">I", len(data))
            + tag
            + data
            + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 6))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as handle:
        handle.write(png)


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, (top, bottom) in PALETTE.items():
        target = os.path.join(OUT, name)
        write_jpeg(target, W, H, gradient(top, bottom))
        print("·", name)
    print(f"\n{len(PALETTE)} imágenes en {os.path.abspath(OUT)}")


if __name__ == "__main__":
    main()
