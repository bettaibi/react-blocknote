import { useState } from "react";
import { BlockNote } from "../features/BlockNote/components/BlockNote";

export const Example = () => {
  const [value, setValue] = useState("");

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>BlockNote Editor Demo</h1>
      <BlockNote
        value={value}
        onChange={setValue}
        placeholder="Start typing or paste a markdown file..."
        showToolbar={true}
        outputFormat="markdown"
      />
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
