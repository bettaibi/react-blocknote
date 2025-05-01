import { useState, useRef, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Link } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

export function LinkButton({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the URL input when the popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setUrl("");
      setText("");
      setOpen(false);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={editor.isActive("link") ? "is-active" : ""}
          title="Insert Link"
        >
          <Link size={20} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="blocknote-popover"
          sideOffset={5}
          align="start"
          alignOffset={-5}
          onInteractOutside={(e) => {
            // Prevent closing when clicking inside the form
            if (
              e.target &&
              (e.target as Element).closest(".blocknote-popover-content")
            ) {
              e.preventDefault();
            }
          }}
        >
          <div className="blocknote-popover-content">
            <h3 className="blocknote-popover-title">Insert Link</h3>
            <form onSubmit={handleSubmit}>
              <div className="blocknote-form-field">
                <label className="blocknote-form-label" htmlFor="link-url">
                  URL
                </label>
                <input
                  id="link-url"
                  ref={inputRef}
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="blocknote-form-input"
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div className="blocknote-form-field">
                <label className="blocknote-form-label" htmlFor="link-text">
                  Text (optional)
                </label>
                <input
                  id="link-text"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="blocknote-form-input"
                  placeholder="Link text"
                />
              </div>
              <div className="blocknote-form-actions">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="blocknote-form-button blocknote-form-button-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="blocknote-form-button blocknote-form-button-submit"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
          <Popover.Arrow className="blocknote-popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
