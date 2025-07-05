import { Heading6 } from "lucide-react";
import { useBlockNoteContext } from "../../providers/blockNoteProvider";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

export function H6Button({
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
      onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      className={className}
      title="Heading 6"
      {...props}
    >
      {children ?? <Heading6 size={iconSize} />}
    </button>
  );
}
