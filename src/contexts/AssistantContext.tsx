import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface AssistantMessage {
  id: number;
  role: "user" | "assistant" | "thinking";
  content: string;
  typing?: boolean;
}

export interface AssistantConfig {
  title?: string;
  subtitle?: string;
  suggestions?: string[];
  initialMessages?: AssistantMessage[];
}

export const DEMO_PHASES = [
  { label: "Sites", path: "/sites" },
  { label: "Program", path: "/program" },
  { label: "Designs", path: "/designs" },
  { label: "Analytics", path: "/analytics" },
  { label: "Cost", path: "/cost" },
  { label: "Tour", path: "/tour" },
  { label: "Deliverables", path: "/deliverables" },
] as const;

export type PhaseLabel = (typeof DEMO_PHASES)[number]["label"];

const PHASE_ROUTES = DEMO_PHASES.map((p) => p.path);

const NEXT_ROUTE: Record<string, string> = {
  "/portfolio": "/sites",
  "/sites": "/program",
  "/program": "/designs",
  "/designs": "/analytics",
  "/analytics": "/cost",
  "/cost": "/tour",
  "/tour": "/deliverables",
  "/deliverables": "/deliverables",
};

const PHASE_MESSAGES: Record<PhaseLabel, string> = {
  Sites: "Great — let's start by reviewing the site locations, constraints, and environmental data for this project.",
  Program: "Now let's define the space program. I've pre-loaded headcount and room requirements for you to review.",
  Designs: "I'm generating design options based on the program you defined. Let's compare layouts and performance metrics.",
  Analytics: "Here's the design performance dashboard. I've benchmarked efficiency, daylight, and density against industry standards.",
  Cost: "Let's look at cost intelligence. I've identified budget variances and potential savings opportunities.",
  Tour: "Time for a virtual walkthrough. This cinematic tour covers all major spaces with AI-generated narration.",
  Deliverables: "Your deliverables are ready! You can review, download, or share the full package from here.",
};

export function normalizePath(pathname: string): string {
  for (const route of PHASE_ROUTES) {
    if (pathname === route || pathname.startsWith(route + "/")) {
      return route;
    }
  }
  return pathname;
}

function getPhaseForRoute(route: string): (typeof DEMO_PHASES)[number] | null {
  return DEMO_PHASES.find((p) => p.path === route) ?? null;
}

interface AssistantContextValue {
  open: boolean;
  toggle: () => void;
  setOpen: (v: boolean) => void;
  config: AssistantConfig;
  setConfig: (c: AssistantConfig) => void;
  messages: AssistantMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AssistantMessage[]>>;
  isThinking: boolean;
  setIsThinking: (v: boolean) => void;
  advanceFromRoute: (currentPathname: string) => { path: string; message: string; isLast: boolean } | null;
  currentPhaseFromRoute: (currentPathname: string) => (typeof DEMO_PHASES)[number] | null;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [config, setConfig] = useState<AssistantConfig>({
    title: "qbiq",
    subtitle: "Online",
    suggestions: ["Continue"],
  });
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'll walk you through this project step by step. Click **Continue** or send any message to begin the demo flow.",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const advanceFromRoute = useCallback((currentPathname: string) => {
    const normalized = normalizePath(currentPathname);
    const nextPath = NEXT_ROUTE[normalized];
    if (!nextPath || nextPath === normalized) return null;
    const nextPhase = getPhaseForRoute(nextPath);
    if (!nextPhase) return null;
    return {
      path: nextPath,
      message: PHASE_MESSAGES[nextPhase.label],
      isLast: nextPath === "/deliverables",
    };
  }, []);

  const currentPhaseFromRoute = useCallback((currentPathname: string) => {
    const normalized = normalizePath(currentPathname);
    return getPhaseForRoute(normalized);
  }, []);

  return (
    <AssistantContext.Provider
      value={{
        open, toggle, setOpen, config, setConfig, messages, setMessages,
        isThinking, setIsThinking, advanceFromRoute, currentPhaseFromRoute,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within AssistantProvider");
  return ctx;
}
