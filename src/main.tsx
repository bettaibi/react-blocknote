import React from "react";
import ReactDOM from "react-dom/client";
import { Example } from "./example/Example";
import "./features/BlockNote/styles/blocknote.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>
);
