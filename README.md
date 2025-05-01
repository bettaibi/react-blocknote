# React BlockNote

A modern, versatile rich text editor component for React applications with an elegant UI and Notion-like functionality.

## Features

- 🎨 Elegant & modern UI with floating toolbar and bubble menu
- 📊 Full table support with intuitive table controls
- 🔗 Links and image embedding
- ✅ Task lists and checklists
- 📝 Code blocks with syntax highlighting
- 🔤 Rich text formatting (bold, italic, underline, etc.)
- 🧮 Math formula support (KaTeX)
- 📱 Fully responsive design that works on all devices
- 🎯 Clean, accessible component API
- 🔌 Markdown import/export capabilities

## Installation

```bash
npm install @bettaibi/react-blocknote
```

This package uses exact dependency versions to ensure consistent behavior across installations.

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

| Prop           | Type                 | Default                                      | Description                                                               |
| -------------- | -------------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `value`        | string               | `''`                                         | The editor content as HTML or Markdown                                    |
| `onChange`     | function             | -                                            | Callback fired when content changes. Receives the new content as argument |
| `placeholder`  | string               | `'Start typing or paste a markdown file...'` | Placeholder text when editor is empty                                     |
| `className`    | string               | `''`                                         | Additional CSS class for the editor container                             |
| `readOnly`     | boolean              | `false`                                      | Whether the editor is in read-only mode                                   |
| `showToolbar`  | boolean              | `true`                                       | Whether to show the toolbar                                               |
| `outputFormat` | 'html' \| 'markdown' | `'html'`                                     | The format of the output in the onChange callback                         |

## Features

### Text Formatting

The editor supports a wide range of text formatting options:

- Bold, italic, underline
- Headings (H1, H2)
- Lists (ordered, unordered, task lists)
- Text alignment
- Code blocks with syntax highlighting
- Subscript and superscript
- Math formulas using KaTeX

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

## License

MIT

## Credits

This package is built on top of several amazing open-source projects:

- [TipTap](https://tiptap.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [KaTeX](https://katex.org/)
