import { Bold } from "lucide-react";
import { useBlockNoteContext } from "../../providers/blockNoteProvider";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

export function BoldButton({
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
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={className}
      title="Bold"
      {...props}
    >
      {children ?? <Bold size={iconSize} />}
    </button>
  );
}
