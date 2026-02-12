import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface RightPaneContextValue {
  content: ReactNode | null;
  setContent: (node: ReactNode | null) => void;
}

const RightPaneContext = createContext<RightPaneContextValue | null>(null);

export function RightPaneProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<ReactNode | null>(null);
  const setContent = useCallback((node: ReactNode | null) => setContentState(node), []);

  return (
    <RightPaneContext.Provider value={{ content, setContent }}>
      {children}
    </RightPaneContext.Provider>
  );
}

export function useRightPane() {
  const ctx = useContext(RightPaneContext);
  if (!ctx) throw new Error("useRightPane must be used within RightPaneProvider");
  return ctx;
}
