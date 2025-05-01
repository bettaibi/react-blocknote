# Optimization Guide for React BlockNote

This document provides guidance on how to optimize the React BlockNote package for production use.

## Bundle Size Optimization

React BlockNote has been designed with bundle size optimization in mind. The package includes most dependencies directly while keeping only a few critical ones (Radix UI components and KaTeX) as peer dependencies to maintain a balance between convenience and bundle size.

### Current Bundle Sizes

When using React BlockNote in your application, the approximate bundle sizes are:

- **ES Module**: ~700-900 KB (200-250 KB gzipped)
- **UMD**: ~700-900 KB (200-250 KB gzipped)
- **CSS**: ~7.3 KB (2.3 KB gzipped)

### Additional Optimization Strategies

1. **Use Tree Shaking**

   Ensure your bundler (Webpack, Rollup, Vite, etc.) has tree shaking enabled to eliminate unused code:

   ```js
   // vite.config.js or rollup.config.js
   export default {
     build: {
       rollupOptions: {
         treeshake: true,
       },
     },
   };
   ```

2. **Lazy Load BlockNote**

   If you don't need the editor on initial page load, consider lazy loading it:

   ```jsx
   import React, { lazy, Suspense } from "react";

   // Lazy load the editor
   const BlockNote = lazy(() =>
     import("@bettaibi/react-blocknote").then((module) => ({
       default: module.BlockNote,
     }))
   );

   // Import CSS in your main file or in a separate CSS file
   import "@bettaibi/react-blocknote/styles.css";

   function YourApp() {
     return (
       <div>
         <Suspense fallback={<div>Loading editor...</div>}>
           {showEditor && <BlockNote />}
         </Suspense>
       </div>
     );
   }
   ```

3. **Use Code Splitting**

   If you're using a bundler with code-splitting capabilities, make sure your configuration optimally splits the editor code:

   ```js
   // webpack.config.js example
   module.exports = {
     optimization: {
       splitChunks: {
         chunks: "all",
         cacheGroups: {
           blocknote: {
             test: /[\\/]node_modules[\\/]@bettaibi[\\/]/,
             name: "blocknote",
             chunks: "all",
           },
         },
       },
     },
   };
   ```

4. **Optimize TipTap Extensions**

   If you don't need all the TipTap extensions, you can create a custom build that only includes what you need:

   ```jsx
   import { BlockNote } from "@bettaibi/react-blocknote";

   // Only include the extensions you need
   const customExtensions = {
     // Exclude certain extensions you don't need
     codeBlock: false,
     table: false,
     // other options...
   };

   function MyEditor() {
     return (
       <BlockNote
         extensions={customExtensions}
         // other props...
       />
     );
   }
   ```

5. **Optimize Images and Media**

   When using the editor to embed images or other media:

   - Use image CDNs or optimization services
   - Consider lazy loading images within the editor content
   - Implement responsive images using srcset

## Performance Optimization

1. **Memoize the Editor Component**

   Wrap your editor with React.memo to prevent unnecessary re-renders:

   ```jsx
   const MemoizedBlockNote = React.memo(BlockNote);

   function MyApp() {
     return <MemoizedBlockNote {...props} />;
   }
   ```

2. **Debounce onChange Events**

   For large documents, debounce the onChange handler to prevent excessive updates:

   ```jsx
   import { useCallback } from "react";
   import debounce from "lodash.debounce";

   function MyEditor() {
     const [content, setContent] = useState("");

     // Debounce the onChange handler
     const debouncedOnChange = useCallback(
       debounce((newContent) => {
         setContent(newContent);
         // Any other logic like saving to backend
       }, 300),
       []
     );

     return <BlockNote onChange={debouncedOnChange} value={content} />;
   }
   ```

3. **Virtualize Large Documents**

   For very large documents, consider implementing virtualization to only render visible content.

## Network Optimization

1. **Cache Control**

   Implement appropriate cache headers for the editor's static assets:

   ```
   Cache-Control: max-age=31536000, immutable
   ```

2. **Preload Critical Resources**

   Add preload hints for critical editor resources:

   ```html
   <link rel="preload" href="/path/to/blocknote.css" as="style" />
   ```

## Server-Side Rendering

When using SSR frameworks like Next.js, dynamically import the editor component on client-side only:

```jsx
import dynamic from "next/dynamic";

const BlockNote = dynamic(
  () => import("@bettaibi/react-blocknote").then((mod) => mod.BlockNote),
  { ssr: false }
);
```

## Monitoring Bundle Size

Use tools like [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) VSCode extension or [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) to monitor the impact of the editor on your bundle size.

## Further Help

If you need more specific optimization advice for your use case, please open an issue on our GitHub repository.
