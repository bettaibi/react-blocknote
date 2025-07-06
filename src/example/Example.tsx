import { useState } from "react";
import { BlockNote } from "../features/BlockNote/components/BlockNote";
import { BlockNoteProvider } from "../features/BlockNote/providers/blockNoteProvider";
import { BlockNoteContent } from "../features/BlockNote/components/atomic/BlockNoteContent";
import { BubbleMenu } from "../features/BlockNote/components/atomic/BubbleMenu";
import { BoldButton } from "../features/BlockNote/components/atomic/BoldButton";
import { ItalicButton } from "../features/BlockNote/components/atomic/ItalicButton";
import { H1Button } from "../features/BlockNote/components/atomic/H1Button";
import { NormalTextButton } from "../features/BlockNote/components/atomic/NormalTextButton";
import { UndoButton } from "../features/BlockNote/components/atomic/UndoButton";
import { useBlockNoteHandlers } from "../features/BlockNote/hooks/useBlockNoteHandlers";
import { useBlockNoteValues } from "../features/BlockNote/hooks/useBlockNoteValues";

function CustomRedoButton() {
  const { handleRedo } = useBlockNoteHandlers();
  const { canRedo } = useBlockNoteValues();
  return (
    <button onClick={handleRedo} disabled={!canRedo}>
      Redo
    </button>
  );
}

export const Example = () => {
  const [value, setValue] = useState("");

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>BlockNote Editor Demo</h1>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ borderRight: "1px solid #ccc", paddingRight: "1rem" }}>
          <h1>Editor 1</h1>
          <BlockNoteProvider
            value={value}
            onChange={setValue}
            placeholder="Start typing or paste a markdown file..."
            outputFormat="markdown"
          >
            <BlockNote showToolbar={true} showBubbleMenu />
          </BlockNoteProvider>
        </div>

        <div>
          <h1>Editor 2</h1>
          <BlockNoteProvider
            value={value}
            onChange={setValue}
            placeholder="Start typing or paste a markdown file..."
            outputFormat="markdown"
          >
            <div style={{ width: "100%", height: "100%" }}>
              <BlockNoteContent />

              <BubbleMenu className="blocknote-bubble-menu">
                <BoldButton />
                <ItalicButton />
                <H1Button />
                <NormalTextButton>
                  <span>Normal Text</span>
                </NormalTextButton>
                <button>Underline</button>
                <button>Strikethrough</button>
                <button>Code</button>
                <button>Link</button>
                <button>Image</button>
              </BubbleMenu>

              {/* Toolbar */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "4px",
                  marginTop: "1rem",
                  border: "1px solid #ccc",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <UndoButton />
                <CustomRedoButton />
              </div>
            </div>
          </BlockNoteProvider>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Markdown Output:</h2>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {value}
        </pre>
      </div>
    </div>
  );
};
