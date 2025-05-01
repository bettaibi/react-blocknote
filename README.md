# React BlockNote

A modern, versatile rich text editor component for React applications with an elegant UI and Notion-like functionality.

[![GitHub stars](https://img.shields.io/github/stars/bettaibi/react-blocknote.svg?style=social&label=Star&maxAge=2592000)](https://github.com/bettaibi/react-blocknote)

> ⭐ If you find this project useful or interesting, please consider giving it a star on GitHub! Your support helps us grow and improve the library for everyone.

## Features

- 🎨 Elegant & modern UI with floating toolbar and bubble menu
- 📊 Full table support with intuitive table controls
- 🔗 Links and image embedding
- ✅ Task lists and checklists
- 📝 Code blocks with syntax highlighting
- 🔤 Rich text formatting (bold, italic, underline, etc.)
- 📑 Comprehensive heading options (H1-H6) with dropdown menu
- 🧮 Math formula support (KaTeX)
- 📱 Fully responsive design that works on all devices
- 🎯 Clean, accessible component API
- 🔌 Markdown import/export capabilities

## Installation

```bash
npm install @bettaibi/react-blocknote
```

### Peer Dependencies

React BlockNote has a few peer dependencies that need to be installed:

```bash
npm install @radix-ui/react-dropdown-menu@2.1.12 @radix-ui/react-popover@1.1.11 katex@0.16.22
```

This approach minimizes the number of peer dependencies while maintaining an optimal package size.

### Bundle Size Optimization

For detailed information on how to optimize the bundle size and performance of React BlockNote in your application, please refer to our [Optimization Guide](./OPTIMIZATION.md).

## Usage

```jsx
import { BlockNote } from "@bettaibi/react-blocknote";
import "@bettaibi/react-blocknote/styles.css"; // Import styles

function MyEditor() {
  const [content, setContent] = useState("");

  return (
    <BlockNote
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
      outputFormat="html" // or "markdown"
    />
  );
}
```

## Props

| Prop             | Type                 | Default                                      | Description                                                               |
| ---------------- | -------------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `value`          | string               | `''`                                         | The editor content as HTML or Markdown                                    |
| `onChange`       | function             | -                                            | Callback fired when content changes. Receives the new content as argument |
| `placeholder`    | string               | `'Start typing or paste a markdown file...'` | Placeholder text when editor is empty                                     |
| `className`      | string               | `''`                                         | Additional CSS class for the editor container                             |
| `readOnly`       | boolean              | `false`                                      | Whether the editor is in read-only mode                                   |
| `showToolbar`    | boolean              | `true`                                       | Whether to show the toolbar                                               |
| `showBubbleMenu` | boolean              | `true`                                       | Whether to show the bubble menu on text selection                         |
| `outputFormat`   | 'html' \| 'markdown' | `'html'`                                     | The format of the output in the onChange callback                         |

## Features

### Text Formatting

The editor supports a wide range of text formatting options:

- Bold, italic, underline
- Headings (H1-H6) via convenient dropdown menu
- Lists (ordered, unordered, task lists)
- Text alignment (left, center, right)
- Code blocks with syntax highlighting
- Subscript and superscript
- Math formulas using KaTeX
- Contextual bubble menu that appears on text selection
- Accessible popover components for links and images

### Tables

Create and manage tables with an intuitive dropdown menu:

- Insert tables
- Add/delete rows and columns
- Format table cells

### Links & Images

Easily add links and images with a clean, accessible UI.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- React 18.0.0 or higher
- Node.js 18.0.0 or higher

## Credits

This package is built on top of several amazing open-source projects:

- [TipTap](https://tiptap.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [KaTeX](https://katex.org/)
