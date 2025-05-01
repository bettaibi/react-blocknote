export function htmlToMarkdown(html: string) {
  return html
    .replace(/<h1>(.*?)<\/h1>/g, "# $1\n")
    .replace(/<h2>(.*?)<\/h2>/g, "## $1\n")
    .replace(/<h3>(.*?)<\/h3>/g, "### $1\n")
    .replace(/<p>(.*?)<\/p>/g, "$1\n")
    .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
    .replace(/<em>(.*?)<\/em>/g, "*$1*")
    .replace(/<u>(.*?)<\/u>/g, "_$1_")
    .replace(/<code>(.*?)<\/code>/g, "`$1`")
    .replace(/<pre>(.*?)<\/pre>/g, "```\n$1\n```")
    .replace(/<ul>(.*?)<\/ul>/g, "$1")
    .replace(/<ol>(.*?)<\/ol>/g, "$1")
    .replace(/<li>(.*?)<\/li>/g, "- $1\n")
    .replace(/<blockquote>(.*?)<\/blockquote>/g, "> $1\n")
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)")
    .replace(/<img src="(.*?)".*?>/g, "![]($1)")
    .replace(/<table>(.*?)<\/table>/gs, (_, content) => {
      const rows = content.match(/<tr>(.*?)<\/tr>/gs) || [];
      return (
        rows
          .map((row: string) => {
            const cells = row.match(/<t[dh]>(.*?)<\/t[dh]>/gs) || [];
            return (
              "| " +
              cells
                .map((cell: string) =>
                  cell.replace(/<t[dh]>(.*?)<\/t[dh]>/s, "$1").trim()
                )
                .join(" | ") +
              " |"
            );
          })
          .join("\n") + "\n"
      );
    })
    .replace(/<span class="math-inline">(.*?)<\/span>/g, "$$$1$$")
    .replace(/<div class="math-block">(.*?)<\/div>/g, "$$\n$1\n$$")
    .replace(/\n\n+/g, "\n\n")
    .trim();
}
