import { Editor } from "@tiptap/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Table,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Columns,
  Rows3,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export function TableOptionsButton({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toolbar = document.querySelector(".blocknote-toolbar");
    if (toolbar) {
      if (isOpen) {
        toolbar.classList.add("is-dropdown-active");
      } else {
        toolbar.classList.remove("is-dropdown-active");
      }
    }
  }, [isOpen]);

  const isTableActive = () => {
    return (
      editor.isActive("table") ||
      editor.can().addColumnAfter() ||
      editor.can().addRowAfter() ||
      editor.can().deleteTable()
    );
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={isTableActive() ? "is-active" : ""}
          title="Table Options"
        >
          <div className="table-button-content">
            <Table size={20} />
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
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            disabled={editor.isActive("table")}
          >
            <Table size={16} />
            <span>Insert Table</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="blocknote-dropdown-separator" />

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
          >
            <ArrowLeft size={16} />
            <span>Add Column Before</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
          >
            <ArrowRight size={16} />
            <span>Add Column After</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
          >
            <Columns size={16} />
            <span>Delete Column</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="blocknote-dropdown-separator" />

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
          >
            <ArrowUp size={16} />
            <span>Add Row Before</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
          >
            <ArrowDown size={16} />
            <span>Add Row After</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="blocknote-dropdown-item"
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
          >
            <Rows3 size={16} />
            <span>Delete Row</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="blocknote-dropdown-separator" />

          <DropdownMenu.Item
            className="blocknote-dropdown-item blocknote-dropdown-item-danger"
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.can().deleteTable()}
          >
            <Trash2 size={16} />
            <span>Delete Table</span>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="blocknote-dropdown-arrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
