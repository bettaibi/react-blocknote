import { Editor } from "@tiptap/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Type,
  ChevronDown,
} from "lucide-react";

export function HeadingDropdown({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={editor.isActive("heading") ? "is-active" : ""}
          title="Headings"
        >
          <div className="heading-button-content">
            <Type size={20} />
            <ChevronDown size={14} className="dropdown-caret" />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="blocknote-dropdown"
          sideOffset={5}
          align="start"
          alignOffset={-5}
        >
          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={16} />
            <span>Heading 1</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={16} />
            <span>Heading 2</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={16} />
            <span>Heading 3</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <Heading4 size={16} />
            <span>Heading 4</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <Heading5 size={16} />
            <span>Heading 5</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <Heading6 size={16} />
            <span>Heading 6</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="blocknote-dropdown-separator" />

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <span>Normal Text</span>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="blocknote-dropdown-arrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
