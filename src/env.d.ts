/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly IG_ACCESS_TOKEN?: string;
  readonly IG_USER_ID?: string;
  readonly TIKTOK_ACCESS_TOKEN?: string;
  readonly TIKTOK_OPEN_ID?: string;
  readonly MEDIA_KIT_PDF_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
