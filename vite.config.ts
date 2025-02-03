import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "./build/dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./") }],
  },
  test: {
    watch: false,
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
    open: false,
    hmr: false,
  },
});
