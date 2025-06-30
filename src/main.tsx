import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Example } from "./example/Example";
import "./features/BlockNote/styles/blocknote.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Example />
  </StrictMode>
);
