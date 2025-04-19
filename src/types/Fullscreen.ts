import { Context } from "react";

interface FullscreenContextValue {
  element?: HTMLElement | null;
  isFullscreen: boolean;
  enterFullscreen: (element?: HTMLElement) => void;
  exitFullscreen: () => void;
  toggleFullscreen: (element?: HTMLElement) => void;
}

declare const FullscreenContext: Context<FullscreenContextValue>;

interface WebkitElement extends HTMLElement {
  webkitRequestFullscreen(): void;
}

interface MozElement extends HTMLElement {
  mozRequestFullScreen(): void;
}

interface MSElement extends HTMLElement {
  msRequestFullscreen(): void;
}

interface WebkitDocument extends Document {
  webkitExitFullscreen(): void;
}

interface MozDocument extends Document {
  mozCancelFullScreen(): void;
}

interface MSDocument extends Document {
  msExitFullscreen(): void;
}

export { FullscreenContext };
export type {
  WebkitElement,
  MozElement,
  MSElement,
  WebkitDocument,
  MozDocument,
  MSDocument,
};
