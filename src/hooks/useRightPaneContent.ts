import { useEffect, useRef, ReactNode } from "react";
import { useRightPane } from "@/contexts/RightPaneContext";

/**
 * Sets right-pane content on mount, clears on unmount.
 * Accepts a stable key to detect when content actually changes,
 * avoiding infinite loops from inline JSX references.
 */
export function useRightPaneContent(content: ReactNode, key?: string) {
  const { setContent } = useRightPane();
  const contentRef = useRef<ReactNode>(content);
  contentRef.current = content;

  useEffect(() => {
    setContent(contentRef.current);
    return () => setContent(null);
    // Re-run when key changes (key should be a primitive string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setContent, key]);
}
