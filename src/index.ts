// Export the main component
export { BlockNote } from "./features/BlockNote/components/BlockNote";
export { BlockNoteProvider } from "./features/BlockNote/providers/blockNoteProvider";

// Atomic components
export { BlockNoteContent } from "./features/BlockNote/components/atomic/BlockNoteContent";
export { BubbleMenu } from "./features/BlockNote/components/atomic/BubbleMenu";
export { BoldButton } from "./features/BlockNote/components/atomic/BoldButton";
export { ItalicButton } from "./features/BlockNote/components/atomic/ItalicButton";
export { TaskListButton } from "./features/BlockNote/components/atomic/TaskListButton";
export { AlignLeftButton } from "./features/BlockNote/components/atomic/AlignLeftButton";
export { AlignCenterButton } from "./features/BlockNote/components/atomic/AlignCenterButton";
export { AlignRightButton } from "./features/BlockNote/components/atomic/AlignRightButton";
export { BulletListButton } from "./features/BlockNote/components/atomic/BulletListButton";
export { OrderedListButton } from "./features/BlockNote/components/atomic/OrderedListButton";
export { UnderlineButton } from "./features/BlockNote/components/atomic/UnderlineButton";
export { CodeBlockButton } from "./features/BlockNote/components/atomic/CodeBlockButton";
export { StrikeButton } from "./features/BlockNote/components/atomic/StrikeButton";
export { CodeButton } from "./features/BlockNote/components/atomic/CodeButton";
export { BlockquoteButton } from "./features/BlockNote/components/atomic/BlockquoteButton";
export { UndoButton } from "./features/BlockNote/components/atomic/UndoButton";
export { RedoButton } from "./features/BlockNote/components/atomic/RedoButton";
export { H1Button } from "./features/BlockNote/components/atomic/H1Button";
export { H2Button } from "./features/BlockNote/components/atomic/H2Button";
export { H3Button } from "./features/BlockNote/components/atomic/H3Button";
export { H4Button } from "./features/BlockNote/components/atomic/H4Button";
export { H5Button } from "./features/BlockNote/components/atomic/H5Button";
export { H6Button } from "./features/BlockNote/components/atomic/H6Button";
export { NormalTextButton } from "./features/BlockNote/components/atomic/NormalTextButton";

// Hooks
export { useBlockNoteHandlers } from "./features/BlockNote/hooks/useBlockNoteHandlers";
export { useBlockNoteValues } from "./features/BlockNote/hooks/useBlockNoteValues";

// types
export type { BlockNoteProps } from "./features/BlockNote/components/BlockNote";
export type { BlockNoteProviderProps } from "./features/BlockNote/providers/blockNoteProvider";

// Import styles in specific order
import "./features/BlockNote/styles/external-styles.css";
import "./features/BlockNote/styles/blocknote.css";
