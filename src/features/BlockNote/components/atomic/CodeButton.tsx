import { Code } from "lucide-react";
import { useBlockNoteContext } from "../../providers/BlockNoteProvider";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

export function CodeButton({
  className = "",
  children,
  iconSize = 16,
  ...props
}: Props) {
  const editor = useBlockNoteContext();

  if (!editor) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleCode().run()}
      className={className}
      title="Inline Code"
      {...props}
    >
      {children ?? <Code size={iconSize} />}
    </button>
  );
}
