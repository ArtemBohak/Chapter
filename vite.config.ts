import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import viteCompression from "vite-plugin-compression";
import * as path from "path";

export default defineConfig({
  server: {
    https: true,
  },
  plugins: [react(), mkcert(), viteCompression(), splitVendorChunkPlugin()],
  build: { chunkSizeWarningLimit: 1000, sourcemap: true },
  css: { devSourcemap: true },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname) },
      { find: "src", replacement: path.resolve(__dirname, "src") },
      {
        find: "components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
});
