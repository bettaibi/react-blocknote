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

### React Version Compatibility

React BlockNote supports both React 18 and React 19. The package is designed to work seamlessly with either version without any breaking changes.

- **React 18**: Full support with all features
- **React 19**: Full support with all features, including the latest React improvements and concurrent features

> **Note**: For React 19 users, the package has been specifically tested and optimized to work with Next.js 15 and other React 19 applications. All React-specific imports and type references have been updated for maximum compatibility.

### Bundle Size Optimization

For detailed information on how to optimize the bundle size and performance of React BlockNote in your application, please refer to our [Optimization Guide](./OPTIMIZATION.md).

## Usage

### Regular BlockNote Component

For most use cases, you can use the pre-built BlockNote component:

```jsx
import { BlockNote, BlockNoteProvider } from "@bettaibi/react-blocknote";
import "@bettaibi/react-blocknote/styles.css"; // Import styles

function MyEditor() {
  const [content, setContent] = useState("");

  return (
    // if you are using tailwind ensure adding prose classNames to the BlockNote wrapper
    <div className="lg:prose-md prose h-full max-w-full">
      <BlockNoteProvider
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
        outputFormat="html" // or "markdown"
      >
        <BlockNote />
      </BlockNoteProvider>
    </div>
  );
}
```

### Custom BlockNote with Atomic Components

For highly customized editors, you have two options for building your own editor:

#### Option 1: Using Atomic Components

Use pre-built atomic components with built-in functionality:

```jsx
import {
  BlockNoteProvider,
  BlockNoteContent,
  BoldButton,
  ItalicButton,
  UnderlineButton,
} from "@bettaibi/react-blocknote/atomic";
import "@bettaibi/react-blocknote/styles.css";

function CustomEditor() {
  const [content, setContent] = useState("");

  return (
    <BlockNoteProvider value={content} onChange={setContent}>
      <div className="custom-editor">
        {/* Custom toolbar with atomic components */}
        <div className="toolbar">
          <BoldButton iconSize={18} />
          <ItalicButton iconSize={18} />
          <UnderlineButton iconSize={18} />
        </div>

        {/* Editor content */}
        <BlockNoteContent />
      </div>
    </BlockNoteProvider>
  );
}
```

#### Option 2: Using Custom Hooks

Use hooks to build completely custom UI components:

```jsx
import {
  BlockNoteProvider,
  BlockNoteContent,
  useBlockNoteHandlers,
  useBlockNoteValues,
} from "@bettaibi/react-blocknote/atomic";
import "@bettaibi/react-blocknote/styles.css";

function CustomEditor() {
  const [content, setContent] = useState("");
  const { handleBold, handleItalic, handleUnderline } = useBlockNoteHandlers();
  const { canBold, canItalic, canUnderline } = useBlockNoteValues();

  return (
    <BlockNoteProvider value={content} onChange={setContent}>
      <div className="custom-editor">
        {/* Custom toolbar with custom buttons */}
        <div className="toolbar">
          <button className="btn" disabled={!canBold} onClick={handleBold}>
            Bold
          </button>
          <button className="btn" disabled={!canItalic} onClick={handleItalic}>
            Italic
          </button>
          <button
            className="btn"
            disabled={!canUnderline}
            onClick={handleUnderline}
          >
            Underline
          </button>
        </div>

        {/* Editor content */}
        <BlockNoteContent />
      </div>
    </BlockNoteProvider>
  );
}
```

## Server-Side Rendering

When using SSR frameworks like Next.js, dynamically import the editor component on client-side only.
This prevents Next.js from trying to use the DOMParser API during server-side rendering, which was causing the "DOMParser is not defined" error

```jsx
import dynamic from "next/dynamic";

const BlockNote = dynamic(
  () => import("@bettaibi/react-blocknote").then((mod) => mod.BlockNote),
  { ssr: false }
);
```

## Props

### BlockNote Component Props

| Prop             | Type    | Default | Description                                       |
| ---------------- | ------- | ------- | ------------------------------------------------- |
| `className`      | string  | `''`    | Additional CSS class for the editor container     |
| `showToolbar`    | boolean | `true`  | Whether to show the toolbar                       |
| `showBubbleMenu` | boolean | `true`  | Whether to show the bubble menu on text selection |

### BlockNoteProvider Props

| Prop           | Type                 | Default                                      | Description                                                               |
| -------------- | -------------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `children`     | React.ReactNode      | -                                            | React children to be wrapped by the provider                              |
| `value`        | string               | `''`                                         | The editor content as HTML or Markdown                                    |
| `onChange`     | function             | -                                            | Callback fired when content changes. Receives the new content as argument |
| `placeholder`  | string               | `'Start typing or paste a markdown file...'` | Placeholder text when editor is empty                                     |
| `readOnly`     | boolean              | `false`                                      | Whether the editor is in read-only mode                                   |
| `outputFormat` | 'html' \| 'markdown' | `'html'`                                     | The format of the output in the onChange callback                         |

### Atomic Component Props

All atomic components accept standard button props plus:

| Prop        | Type            | Default | Description                                |
| ----------- | --------------- | ------- | ------------------------------------------ |
| `className` | string          | `''`    | Additional CSS class for the button        |
| `iconSize`  | number          | `16`    | Size of the icon in pixels                 |
| `children`  | React.ReactNode | -       | Custom content to replace the default icon |

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

## Atomic Components

When importing from `@bettaibi/react-blocknote/atomic`, you have access to all these atomic components:

### Text Formatting Components

| Component         | Description                          |
| ----------------- | ------------------------------------ |
| `BoldButton`      | Toggle bold text formatting          |
| `ItalicButton`    | Toggle italic text formatting        |
| `UnderlineButton` | Toggle underline text formatting     |
| `StrikeButton`    | Toggle strikethrough text formatting |
| `CodeButton`      | Toggle inline code formatting        |

### Heading Components

| Component          | Description                      |
| ------------------ | -------------------------------- |
| `H1Button`         | Set heading level 1              |
| `H2Button`         | Set heading level 2              |
| `H3Button`         | Set heading level 3              |
| `H4Button`         | Set heading level 4              |
| `H5Button`         | Set heading level 5              |
| `H6Button`         | Set heading level 6              |
| `NormalTextButton` | Convert to normal paragraph text |

### List Components

| Component           | Description         |
| ------------------- | ------------------- |
| `BulletListButton`  | Toggle bullet list  |
| `OrderedListButton` | Toggle ordered list |
| `TaskListButton`    | Toggle task list    |

### Block Components

| Component          | Description       |
| ------------------ | ----------------- |
| `CodeBlockButton`  | Toggle code block |
| `BlockquoteButton` | Toggle blockquote |

### Alignment Components

| Component           | Description          |
| ------------------- | -------------------- |
| `AlignLeftButton`   | Align text to left   |
| `AlignCenterButton` | Align text to center |
| `AlignRightButton`  | Align text to right  |

### History Components

| Component    | Description      |
| ------------ | ---------------- |
| `UndoButton` | Undo last action |
| `RedoButton` | Redo last action |

### Core Components

| Component          | Description                                    |
| ------------------ | ---------------------------------------------- |
| `BlockNoteContent` | The main editor content area                   |
| `BubbleMenu`       | Contextual menu that appears on text selection |

## Hooks

### useBlockNoteHandlers()

Returns handlers for all editor operations:

| Category            | Handler                 | Description                     |
| ------------------- | ----------------------- | ------------------------------- |
| **Text Formatting** | `handleBold`            | Toggle bold formatting          |
|                     | `handleItalic`          | Toggle italic formatting        |
|                     | `handleUnderline`       | Toggle underline formatting     |
|                     | `handleStrike`          | Toggle strikethrough formatting |
|                     | `handleCode`            | Toggle inline code formatting   |
| **Headings**        | `handleHeading1`        | Set heading level 1             |
|                     | `handleHeading2`        | Set heading level 2             |
|                     | `handleHeading3`        | Set heading level 3             |
|                     | `handleHeading4`        | Set heading level 4             |
|                     | `handleHeading5`        | Set heading level 5             |
|                     | `handleHeading6`        | Set heading level 6             |
|                     | `handleNormalText`      | Convert to normal paragraph     |
| **Lists**           | `handleBulletList`      | Toggle bullet list              |
|                     | `handleOrderedList`     | Toggle ordered list             |
|                     | `handleTaskList`        | Toggle task list                |
| **Blocks**          | `handleCodeBlock`       | Toggle code block               |
|                     | `handleBlockquote`      | Toggle blockquote               |
| **Alignment**       | `handleAlignLeft`       | Align text to left              |
|                     | `handleAlignCenter`     | Align text to center            |
|                     | `handleAlignRight`      | Align text to right             |
| **History**         | `handleUndo`            | Undo last action                |
|                     | `handleRedo`            | Redo last action                |
| **Media**           | `handleImage`           | Insert image                    |
|                     | `handleLink`            | Insert/edit link                |
| **Tables**          | `handleInsertTable`     | Insert new table                |
|                     | `handleDeleteTable`     | Delete current table            |
|                     | `handleAddColumnBefore` | Add column before current       |
|                     | `handleAddColumnAfter`  | Add column after current        |
|                     | `handleDeleteColumn`    | Delete current column           |
|                     | `handleAddRowBefore`    | Add row before current          |
|                     | `handleAddRowAfter`     | Add row after current           |
|                     | `handleDeleteRow`       | Delete current row              |

### useBlockNoteValues()

Returns state values for UI control:

| Category                  | Value                | Description                                |
| ------------------------- | -------------------- | ------------------------------------------ |
| **Active State Checkers** | `getActiveMark`      | Check if a mark/node is active             |
|                           | `getTextAlignState`  | Check if specific text alignment is active |
|                           | `TextAlign`          | Text alignment constants                   |
| **History**               | `canUndo`            | Check if undo is available                 |
|                           | `canRedo`            | Check if redo is available                 |
| **Text Formatting**       | `canBold`            | Check if bold can be applied               |
|                           | `canItalic`          | Check if italic can be applied             |
|                           | `canUnderline`       | Check if underline can be applied          |
|                           | `canStrike`          | Check if strikethrough can be applied      |
|                           | `canCode`            | Check if inline code can be applied        |
| **Headings**              | `canHeading1`        | Check if heading 1 can be applied          |
|                           | `canHeading2`        | Check if heading 2 can be applied          |
|                           | `canHeading3`        | Check if heading 3 can be applied          |
|                           | `canHeading4`        | Check if heading 4 can be applied          |
|                           | `canHeading5`        | Check if heading 5 can be applied          |
|                           | `canHeading6`        | Check if heading 6 can be applied          |
|                           | `canNormalText`      | Check if normal text can be applied        |
| **Lists**                 | `canBulletList`      | Check if bullet list can be applied        |
|                           | `canOrderedList`     | Check if ordered list can be applied       |
|                           | `canTaskList`        | Check if task list can be applied          |
| **Blocks**                | `canCodeBlock`       | Check if code block can be applied         |
|                           | `canBlockquote`      | Check if blockquote can be applied         |
| **Tables**                | `canInsertTable`     | Check if table can be inserted             |
|                           | `canDeleteTable`     | Check if table can be deleted              |
|                           | `canAddColumnBefore` | Check if column can be added before        |
|                           | `canAddColumnAfter`  | Check if column can be added after         |
|                           | `canDeleteColumn`    | Check if column can be deleted             |
|                           | `canAddRowBefore`    | Check if row can be added before           |
|                           | `canAddRowAfter`     | Check if row can be added after            |
|                           | `canDeleteRow`       | Check if row can be deleted                |

### Hook Usage Examples

```typescript
// Check if bold is currently active
const isBoldActive = getActiveMark(BlockNoteMark.BOLD);

// Check if text is center-aligned
const isCenterAligned = getTextAlignState(TextAlign.CENTER);

// Check if undo operation is available
const canUndoOperation = canUndo;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- React 18.0.0 or higher (supports both React 18 and 19)
- Node.js 18.0.0 or higher

## Credits

This package is built on top of several amazing open-source projects:

- [TipTap](https://tiptap.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [KaTeX](https://katex.org/)
