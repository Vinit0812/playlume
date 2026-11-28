function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeHref(rawHref: string): string | null {
  const href = rawHref.trim();
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }
  return null;
}

function formatInline(rawText: string): string {
  // Extract inline code and links before escaping remaining text
  const tokens: string[] = [];
  let text = rawText;

  text = text.replace(/`([^`\n]+)`/g, (_match, code: string) => {
    const idx = tokens.length;
    tokens.push(
      `<code class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[0.9em] font-mono">${escapeHtml(
        code
      )}</code>`
    );
    return `\u0000TOK${idx}\u0000`;
  });

  text = text.replace(
    /\[([^\]\n]+)\]\(([^)\n]+)\)/g,
    (_match, label: string, rawHref: string) => {
      const safeHref = sanitizeHref(rawHref);
      const formattedLabel = escapeHtml(label).replace(
        /\*\*([^*\n]+)\*\*/g,
        '<strong class="font-semibold">$1</strong>'
      );
      if (!safeHref) {
        return formattedLabel;
      }
      const isExternal = safeHref.startsWith("http://") || safeHref.startsWith("https://");
      const extraAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      const idx = tokens.length;
      tokens.push(
        `<a href="${escapeHtml(
          safeHref
        )}"${extraAttrs} class="text-slate-900 font-semibold underline decoration-amber-500/70 underline-offset-2 hover:text-amber-700 transition-colors">${formattedLabel}</a>`
      );
      return `\u0000TOK${idx}\u0000`;
    }
  );

  let escaped = escapeHtml(text);

  escaped = escaped.replace(
    /\*\*([^*\n]+)\*\*/g,
    '<strong class="font-semibold text-neutral-900">$1</strong>'
  );

  // Match intentional *italic* spans without accidentally italicizing math operators like "10 * 20"
  escaped = escaped.replace(
    /(?<![\w*])\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*(?![\w*])/g,
    "<em>$1</em>"
  );

  return escaped.replace(/\u0000TOK(\d+)\u0000/g, (_m, idxStr: string) => {
    return tokens[Number(idxStr)] ?? "";
  });
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return false;
  const cells = parseTableRow(trimmed);
  return cells.length > 0 && cells.every((cell) => /^:?-{2,}:?$/.test(cell));
}

/**
 * Converts trusted internal Markdown article strings into styled semantic HTML during SSR.
 */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const hasExplicitH2 = lines.some((line) => /^##\s+/.test(line.trim()));

  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (/^---+$/.test(line) || /^\*\*\*+$/.test(line)) {
      html.push('<hr class="my-8 border-neutral-200" />');
      i++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      const rawLevel = headingMatch[1].length;
      const content = formatInline(headingMatch[2].trim());
      // Promote h3 -> h2 when article uses ### as top section level so h1 -> h2 hierarchy holds
      let level = rawLevel;
      if (!hasExplicitH2 && rawLevel >= 3) {
        level = rawLevel - 1;
      }
      if (level <= 2) {
        html.push(
          `<h2 class="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mt-8 first:mt-0 mb-3">${content}</h2>`
        );
      } else if (level === 3) {
        html.push(
          `<h3 class="text-lg font-bold text-neutral-900 tracking-tight mt-6 mb-2.5">${content}</h3>`
        );
      } else {
        html.push(
          `<h4 class="text-base font-bold text-neutral-900 mt-5 mb-2">${content}</h4>`
        );
      }
      i++;
      continue;
    }

    // Markdown table
    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[i]));
        i++;
      }
      const thHtml = headers
        .map(
          (h) =>
            `<th scope="col" class="px-4 py-2.5 text-left font-bold text-neutral-900 bg-neutral-100 border-b border-neutral-200">${formatInline(
              h
            )}</th>`
        )
        .join("");
      const bodyHtml = rows
        .map((row) => {
          const tdHtml = headers
            .map((_h, colIdx) => {
              const cell = row[colIdx] ?? "";
              return `<td class="px-4 py-2.5 text-neutral-700 border-b border-neutral-100 align-top">${formatInline(
                cell
              )}</td>`;
            })
            .join("");
          return `<tr class="even:bg-neutral-50/60">${tdHtml}</tr>`;
        })
        .join("");
      html.push(
        `<div class="overflow-x-auto my-6 rounded-xl border border-neutral-200"><table class="w-full text-sm border-collapse"><thead><tr>${thHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`
      );
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      html.push(
        `<blockquote class="border-l-4 border-amber-500 bg-amber-50/50 pl-4 pr-3 py-3 my-5 rounded-r-xl text-neutral-800">${formatInline(
          quoteLines.join(" ")
        )}</blockquote>`
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(
          `<li class="leading-relaxed">${formatInline(
            lines[i].trim().replace(/^[-*]\s+/, "")
          )}</li>`
        );
        i++;
      }
      html.push(
        `<ul class="list-disc pl-6 space-y-2 my-4 text-neutral-700">${items.join("")}</ul>`
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(
          `<li class="leading-relaxed">${formatInline(
            lines[i].trim().replace(/^\d+\.\s+/, "")
          )}</li>`
        );
        i++;
      }
      html.push(
        `<ol class="list-decimal pl-6 space-y-2 my-4 text-neutral-700">${items.join("")}</ol>`
      );
      continue;
    }

    // Paragraph
    const paraLines: string[] = [line];
    i++;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        !next ||
        /^(#{1,4})\s+/.test(next) ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next) ||
        next.startsWith(">") ||
        /^---+$/.test(next) ||
        (next.startsWith("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
      ) {
        break;
      }
      paraLines.push(next);
      i++;
    }
    html.push(
      `<p class="text-neutral-700 leading-relaxed my-4 first:mt-0">${formatInline(
        paraLines.join(" ")
      )}</p>`
    );
  }

  return html.join("\n");
}
