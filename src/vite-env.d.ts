/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_REST_API_SERVER: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
