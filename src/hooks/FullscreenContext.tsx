import React, {
  useCallback,
  useState,
  ReactNode,
  createContext,
  useContext,
} from "react";
import {
  WebkitElement,
  MozElement,
  MSElement,
  WebkitDocument,
  MozDocument,
  MSDocument,
} from "../types/Fullscreen";
import { Emitter } from "../utils/Emitter";

interface FullscreenContextType {
  isFullscreen: boolean;
  enterFullscreen: (element?: HTMLElement) => void;
  exitFullscreen: () => void;
  toggleFullscreen: (element?: HTMLElement) => void;
  fullscreenEmitter: Emitter<boolean>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FullscreenContext = createContext<FullscreenContextType>({
  isFullscreen: false,
  enterFullscreen: () => {},
  exitFullscreen: () => {},
  toggleFullscreen: () => {},
  fullscreenEmitter: new Emitter<boolean>(),
});

interface FullscreenProviderProps {
  children: ReactNode;
}

export const FullscreenProvider = ({ children }: FullscreenProviderProps) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const fullscreenEmitter = new Emitter<boolean>();

  const enterFullscreen = useCallback(
    (element: HTMLElement = document.documentElement) => {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ("webkitRequestFullscreen" in element) {
        (element as WebkitElement).webkitRequestFullscreen();
      } else if ("mozRequestFullScreen" in element) {
        (element as MozElement).mozRequestFullScreen();
      } else if ("msRequestFullscreen" in element) {
        (element as MSElement).msRequestFullscreen();
      }
    },
    []
  );

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ("webkitExitFullscreen" in document) {
      (document as WebkitDocument).webkitExitFullscreen();
    } else if ("mozCancelFullScreen" in document) {
      (document as MozDocument).mozCancelFullScreen();
    } else if ("msExitFullscreen" in document) {
      (document as MSDocument).msExitFullscreen();
    }
  }, []);

  const toggleFullscreen = useCallback(
    (element?: HTMLElement) => {
      if (!isFullscreen) {
        enterFullscreen(element);
      } else {
        exitFullscreen();
      }
    },
    [isFullscreen, enterFullscreen, exitFullscreen]
  );

  const handleFullscreenChange = () => {
    const newIsFullscreen = Boolean(
      document.fullscreenElement ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).webkitFullscreenElement ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).mozFullScreenElement ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).msFullscreenElement
    );
    setIsFullscreen(newIsFullscreen);
    fullscreenEmitter.emit(newIsFullscreen);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault();
        toggleFullscreen();
      }
      if (event.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    },
    [isFullscreen, toggleFullscreen, exitFullscreen]
  );

  React.useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        fullscreenEmitter,
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  if (context === undefined) {
    throw new Error("useFullscreen must be used within a FullscreenProvider");
  }
  return context;
};

export default FullscreenProvider;
