module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  css: ["./dist/style.css"],
  output: "./dist/style.css",
  safelist: [
    // Core classes that should never be removed
    "blocknote-editor",
    "blocknote-toolbar",
    "ProseMirror",
    /^is-active$/,
    // Patterns for dynamically added classes
    /^blocknote-/,
    /^ProseMirror-/,
  ],
  // More aggressive settings
  rejected: true, // Output rejected selectors for debugging
  fontFace: true,
  keyframes: true,
};
