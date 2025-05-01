import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Polyfill for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactBlocknote",
      fileName: (format) => `react-blocknote.${format}.js`,
    },
    cssCodeSplit: false, // Generate a single CSS file
    cssMinify: "lightningcss", // Use lightningcss for better minification
    minify: true, // Ensure minification is enabled
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name === "style.css" ||
            assetInfo.name === "react-blocknote.css"
          ) {
            return "style.css";
          }
          return assetInfo.name || "";
        },
        manualChunks: undefined, // Disable code splitting for library
      },
    },
    sourcemap: false, // Disable sourcemaps in production build to reduce size
  },
  css: {
    // Pre-process CSS with PostCSS
    postcss: "./postcss.config.cjs",
  },
});
