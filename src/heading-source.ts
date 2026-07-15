import type { RenderedHeading } from "./types";

export function collectRenderedHeadings(container: HTMLElement): RenderedHeading[] {
  const containerTop = container.getBoundingClientRect().top;
  return Array.from(container.querySelectorAll<HTMLElement>("h2, h3, h4"))
    .filter((heading) => !heading.closest(".internal-embed, .markdown-embed"))
    .map((heading) => ({
      text: heading.textContent?.trim() ?? "",
      level: Number(heading.tagName.slice(1)),
      documentY: heading.getBoundingClientRect().top - containerTop + container.scrollTop,
      target: heading,
    }))
    .filter((heading) => heading.text.length > 0);
}
