// Export the main BlockNote component for regular usage
export { BlockNoteProvider } from "./features/BlockNote/providers/BlockNoteProvider";
export { BlockNote } from "./features/BlockNote/components/BlockNote";

// Types for regular usage
export type { BlockNoteProps } from "./features/BlockNote/components/BlockNote";
export type { BlockNoteProviderProps } from "./features/BlockNote/providers/BlockNoteProvider";

// Import styles for the main component
import "./features/BlockNote/styles/external-styles.css";
import "./features/BlockNote/styles/blocknote.css";
