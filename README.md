# @bettaibi/react-blocknote

A React component library for rich text editing, built on top of Tiptap.

## Features

- Rich text editing with Tiptap
- Support for headings, lists, and code blocks
- Task lists and checkboxes
- Text alignment and formatting
- Image and link support
- Customizable toolbar
- TypeScript support

## Installation

```bash
npm install @bettaibi/react-blocknote
# or
yarn add @bettaibi/react-blocknote
```

## Usage

```tsx
import { BlockNote } from "@bettaibi/react-blocknote";

function App() {
  const [value, setValue] = React.useState("");

  return (
    <BlockNote
      value={value}
      onChange={setValue}
      placeholder="Start typing..."
      showToolbar={true}
    />
  );
}
```

## Props

| Prop        | Type                    | Default           | Description                               |
| ----------- | ----------------------- | ----------------- | ----------------------------------------- |
| value       | string                  | ''                | The current value of the editor           |
| onChange    | (value: string) => void | undefined         | Callback fired when the value changes     |
| placeholder | string                  | 'Start typing...' | Placeholder text when the editor is empty |
| className   | string                  | ''                | Additional CSS class name                 |
| readOnly    | boolean                 | false             | Whether the editor is read-only           |
| showToolbar | boolean                 | true              | Whether to show the formatting toolbar    |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build
```

## License

MIT
