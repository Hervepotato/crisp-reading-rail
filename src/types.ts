export interface OutlineHeading {
  text: string;
  level: number;
  sourceLine: number;
}

export interface RenderedHeading {
  text: string;
  level: number;
  documentY: number;
  target: HTMLElement;
}

export interface OutlineEntry extends OutlineHeading {
  documentY: number;
  progress: number;
  labelY: number;
  target: HTMLElement | null;
}
