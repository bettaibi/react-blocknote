import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

// Polyfill for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        atomic: resolve(__dirname, "src/atomic.ts"),
      },
      name: "ReactBlocknote",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    cssCodeSplit: false, // Generate a single CSS file
    cssMinify: "lightningcss", // Use lightningcss for better minification
    minify: "terser", // Use terser for better JS minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.warn",
        ],
      },
      output: {
        comments: false,
      },
      ecma: 2020,
    },
    rollupOptions: {
      external: ["react", "react-dom", "katex", /^@radix-ui\//],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          katex: "katex",
          "@radix-ui/react-dropdown-menu": "RadixDropdownMenu",
          "@radix-ui/react-popover": "RadixPopover",
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
        plugins: [
          terser({
            format: {
              comments: false,
            },
            compress: {
              passes: 2,
              drop_console: true,
              pure_getters: true,
            },
          }),
        ],
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    sourcemap: false, // Disable sourcemaps in production build to reduce size
  },
  css: {
    // Pre-process CSS with PostCSS
    postcss: "./postcss.config.cjs",
  },
  optimizeDeps: {
    include: [
      "highlight.js/lib/languages/javascript",
      "highlight.js/lib/languages/python",
      "highlight.js/lib/languages/csharp",
    ],
  },
});
