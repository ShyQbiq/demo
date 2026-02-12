import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_STEPS, type DemoStep, type ChatMsg } from "@/data/demoSteps";

interface StepContextValue {
  currentStepIndex: number;
  totalSteps: number;
  currentStep: DemoStep;
  chatHistory: ChatMsg[];
  suggestions: string[];
  centerVariant: string;
  rightVariant: string;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  /** Call this from video components when the video finishes playing */
  signalVideoEnd: () => void;
}

const StepContext = createContext<StepContextValue | null>(null);

function resolveVariant(
  steps: DemoStep[],
  index: number,
  key: "centerVariant" | "rightVariant"
): string {
  for (let i = index; i >= 0; i--) {
    if (steps[i][key] !== undefined) return steps[i][key]!;
  }
  return "";
}

function resolveRoute(steps: DemoStep[], index: number): string {
  for (let i = index; i >= 0; i--) {
    if (steps[i].route) return steps[i].route!;
  }
  return "/sites";
}

/** Returns true if the step contains a user (Taylor) message */
function isUserStep(step: DemoStep): boolean {
  return step.messages.some((m) => m.role === "user");
}

/**
 * Should this step auto-advance to the next one?
 * Auto-advance unless: step 0, last step, or next step is a user step (end of turn).
 */
function shouldAutoAdvance(index: number): boolean {
  if (index === 0) return false;
  if (index >= DEMO_STEPS.length - 1) return false;
  const nextStep = DEMO_STEPS[index + 1];
  return !isUserStep(nextStep);
}

/** Delay before auto-advancing */
function getAutoAdvanceDelay(step: DemoStep): number {
  if (isUserStep(step)) {
    return 500;
  }
  const hasThinking = step.messages.some((m) => m.role === "thinking");
  if (hasThinking) {
    const totalLines = step.messages.reduce(
      (sum, m) =>
        m.role === "thinking"
          ? sum + m.content.split("\n").filter(Boolean).length
          : sum,
      0
    );
    return Math.max(totalLines * 700, 2400) + 700;
  }
  return 700;
}

export function StepProvider({ children }: { children: ReactNode }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Video gate: tracks whether the current video has finished
  const [videoEnded, setVideoEnded] = useState(false);

  const currentStep = DEMO_STEPS[currentStepIndex];

  const chatHistory = useMemo(() => {
    const msgs: ChatMsg[] = [];
    for (let i = 0; i <= currentStepIndex; i++) {
      msgs.push(...DEMO_STEPS[i].messages);
    }
    return msgs;
  }, [currentStepIndex]);

  const suggestions = currentStep.suggestions ?? [];
  const centerVariant = resolveVariant(DEMO_STEPS, currentStepIndex, "centerVariant");
  const rightVariant = resolveVariant(DEMO_STEPS, currentStepIndex, "rightVariant");

  // Clear any pending auto-advance timer
  const clearAuto = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const signalVideoEnd = useCallback(() => {
    setVideoEnded(true);
  }, []);

  const next = useCallback(() => {
    clearAuto();
    setVideoEnded(false); // reset video gate for the next sequence
    setCurrentStepIndex((prev) => Math.min(prev + 1, DEMO_STEPS.length - 1));
  }, [clearAuto]);

  const prev = useCallback(() => {
    clearAuto();
    setVideoEnded(false);
    // Jump back to the previous qbiq (assistant) message
    setCurrentStepIndex((cur) => {
      for (let i = cur - 1; i >= 0; i--) {
        if (DEMO_STEPS[i].messages.some((m) => m.role === "assistant")) return i;
      }
      return 0;
    });
  }, [clearAuto]);

  const goTo = useCallback(
    (index: number) => {
      clearAuto();
      setVideoEnded(false);
      setCurrentStepIndex(Math.max(0, Math.min(index, DEMO_STEPS.length - 1)));
    },
    [clearAuto]
  );

  // Navigate to the correct route whenever step changes
  useEffect(() => {
    const route = resolveRoute(DEMO_STEPS, currentStepIndex);
    navigate(route, { replace: true });
  }, [currentStepIndex, navigate]);

  // Auto-advance: chain through steps, but respect waitForVideo gate
  useEffect(() => {
    if (!shouldAutoAdvance(currentStepIndex)) return;

    const step = DEMO_STEPS[currentStepIndex];

    // If this step requires waiting for a video and it hasn't ended yet, don't advance
    if (step.waitForVideo && !videoEnded) return;

    const delay = step.waitForVideo ? 300 : getAutoAdvanceDelay(step);
    autoTimerRef.current = setTimeout(() => {
      setVideoEnded(false);
      setCurrentStepIndex((prev) => Math.min(prev + 1, DEMO_STEPS.length - 1));
    }, delay);
    return () => clearAuto();
  }, [currentStepIndex, clearAuto, videoEnded]);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  return (
    <StepContext.Provider
      value={{
        currentStepIndex,
        totalSteps: DEMO_STEPS.length,
        currentStep,
        chatHistory,
        suggestions,
        centerVariant,
        rightVariant,
        next,
        prev,
        goTo,
        signalVideoEnd,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error("useStep must be used within StepProvider");
  return ctx;
}
