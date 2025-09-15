/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEMO_VIDEO_URL: string
  readonly VITE_DEMO_YOUTUBE_URL: string
  readonly VITE_DEMO_IS_YOUTUBE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
