import { useState, useRef, useEffect, MouseEvent } from "react";
import { Editor } from "@tiptap/react";
import { Image } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

export function ImageButton({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the URL input when the popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    // Add or remove the class on the toolbar when popover opens/closes
    const toolbar = document.querySelector(".blocknote-toolbar");
    if (toolbar) {
      if (open) {
        toolbar.classList.add("is-dropdown-active");
      } else {
        toolbar.classList.remove("is-dropdown-active");
      }
    }
  }, [open]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (url) {
      editor.chain().focus().setImage({ src: url, alt }).run();
      setUrl("");
      setAlt("");
      setOpen(false);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={editor.isActive("image") ? "is-active" : ""}
          title="Insert Image"
        >
          <Image size={20} />
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
            <h3 className="blocknote-popover-title">Insert Image</h3>
            <div>
              <div className="blocknote-form-field">
                <label className="blocknote-form-label" htmlFor="image-url">
                  Image URL
                </label>
                <input
                  id="image-url"
                  ref={inputRef}
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="blocknote-form-input"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="blocknote-form-field">
                <label className="blocknote-form-label" htmlFor="image-alt">
                  Alt Text (optional)
                </label>
                <input
                  id="image-alt"
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  className="blocknote-form-input"
                  placeholder="Image description"
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
                  type="button"
                  className="blocknote-form-button blocknote-form-button-submit"
                  onClick={handleSubmit}
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
          <Popover.Arrow className="blocknote-popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
