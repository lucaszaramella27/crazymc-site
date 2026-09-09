/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MINECRAFT_SERVER?: string;
  readonly VITE_MINECRAFT_SERVER_ADDRESS?: string;
  readonly VITE_MINECRAFT_EDITION?: 'java' | 'bedrock';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css';
