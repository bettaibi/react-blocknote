import { PurgeCSS } from "purgecss";
import fs from "fs";

async function purgeCSS() {
  console.log("🔥 Running PurgeCSS on dist/style.css...");

  try {
    // Check if the file exists
    if (!fs.existsSync("./dist/style.css")) {
      console.log("❌ CSS file not found. Build the project first.");
      return;
    }

    const result = await new PurgeCSS().purge({
      content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
      css: ["./dist/style.css"],
      safelist: {
        standard: [
          "blocknote-editor",
          "blocknote-toolbar",
          "ProseMirror",
          /^ProseMirror/,
          /^blocknote-/,
          /^is-/,
          /^table-/,
          /^dropdown-/,
          /^bubble-menu-/,
        ],
        deep: [/hover$/, /focus$/, /active$/, /disabled$/],
        greedy: [/ProseMirror/, /blocknote/, /is-active/, /is-dropdown-active/],
      },
      fontFace: true,
      keyframes: true,
      variables: true,
    });

    if (result.length > 0) {
      // Get original file size
      const originalStats = fs.statSync("./dist/style.css");
      const originalSizeInKB = (originalStats.size / 1024).toFixed(2);

      // Write optimized CSS
      const outputPath = "./dist/style.css";
      fs.writeFileSync(outputPath, result[0].css);

      // Get new file size
      const newStats = fs.statSync(outputPath);
      const newSizeInKB = (newStats.size / 1024).toFixed(2);

      const reduction = (
        (1 - newStats.size / originalStats.size) *
        100
      ).toFixed(2);

      console.log(`✅ CSS optimized successfully!`);
      console.log(`📊 Original size: ${originalSizeInKB} KB`);
      console.log(`📊 Final size: ${newSizeInKB} KB`);
      console.log(`🔥 Reduced by: ${reduction}%`);
    }
  } catch (error) {
    console.error("❌ Error optimizing CSS:", error);
  }
}

purgeCSS().catch((error) => {
  console.error("❌ Error optimizing CSS:", error);
  process.exit(1);
});
