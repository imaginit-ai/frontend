import path from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    dts(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
