export class MarkdownView {}

export function requestUrl(): Promise<never> {
  throw new Error("requestUrl is unavailable in unit tests");
}
