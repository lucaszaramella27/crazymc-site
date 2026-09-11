/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MINECRAFT_SERVER_ADDRESS?: string;
  readonly VITE_MINECRAFT_EDITION?: 'java' | 'bedrock';
  readonly VITE_DISCORD_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css';
