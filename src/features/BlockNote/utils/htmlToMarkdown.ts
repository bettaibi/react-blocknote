import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export function htmlToMarkdown(html: string): string {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });

  // Use GitHub Flavored Markdown plugin
  turndownService.use(gfm);

  // Custom rules for math expressions
  turndownService.addRule("mathInline", {
    filter: (node: Node): boolean =>
      node.nodeName === "SPAN" &&
      (node as Element).classList?.contains("math-inline"),
    replacement: (content: string): string => `$${content}$`,
  });

  turndownService.addRule("mathBlock", {
    filter: (node: Node): boolean =>
      node.nodeName === "DIV" &&
      (node as Element).classList?.contains("math-block"),
    replacement: (content: string): string => `$$\n${content}\n$$`,
  });

  // Handle task lists
  turndownService.addRule("taskListItems", {
    filter: (node: Node): boolean =>
      node.nodeName === "LI" &&
      (node as Element).hasAttribute("data-type") &&
      (node as Element).getAttribute("data-type") === "taskItem",
    replacement: (content: string, node: Node): string => {
      const element = node as Element;
      const isChecked =
        element.hasAttribute("data-checked") &&
        element.getAttribute("data-checked") === "true";
      return `- [${isChecked ? "x" : " "}] ${content.trim()}\n`;
    },
  });

  // Process and return the markdown
  return turndownService.turndown(html).trim();
}
