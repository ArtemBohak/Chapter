import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import * as path from "path";

export default defineConfig({
  server: {
    https: true,
  },
  base: "Chapter",
  plugins: [react(), mkcert()],
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
