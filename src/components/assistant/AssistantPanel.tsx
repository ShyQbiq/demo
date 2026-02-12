import { useEffect, useRef, useState, useMemo } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useStep } from "@/contexts/StepContext";
import type { ChatMsg } from "@/data/demoSteps";

type RenderItem =
  | { kind: "thinking"; lines: string[]; followedByNonThinking: boolean }
  | { kind: "message"; msg: ChatMsg };

export function AssistantPanel() {
  const { chatHistory, suggestions, next } = useStep();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const lastMsg = chatHistory[chatHistory.length - 1];
  const isStudyOverviewActive =
    lastMsg?.role === "assistant" && lastMsg.richContent === "study-recommendation";

  // Auto-scroll on any content change (including thinking line reveals)
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const observer = new MutationObserver(() => {
      el.scrollTop = el.scrollHeight;
    });
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    el.scrollTop = el.scrollHeight;
    return () => observer.disconnect();
  }, []);

  // Group consecutive thinking messages into a single block
  const renderItems = useMemo<RenderItem[]>(() => {
    const items: RenderItem[] = [];

    for (const msg of chatHistory) {
      if (msg.role === "thinking") {
        const msgLines = msg.content.split("\n").filter(Boolean);
        const last = items[items.length - 1];
        if (last?.kind === "thinking") {
          last.lines.push(...msgLines);
        } else {
          items.push({ kind: "thinking", lines: [...msgLines], followedByNonThinking: false });
        }
      } else {
        // Mark the preceding thinking group as complete
        const last = items[items.length - 1];
        if (last?.kind === "thinking") {
          last.followedByNonThinking = true;
        }
        items.push({ kind: "message", msg });
      }
    }

    return items;
  }, [chatHistory]);

  const handleSend = () => {
    if (!input.trim()) return;
    setInput("");
    next();
  };

  const handleSuggestionClick = () => {
    next();
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isStudyOverviewActive ? 640 : 320 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="shrink-0 border-r bg-card flex flex-col h-full text-[14px]"
    >
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {renderItems.map((item, i) =>
          item.kind === "thinking" ? (
            <ThinkingBubble
              key={`t-${i}`}
              lines={item.lines}
              shouldCollapse={item.followedByNonThinking}
            />
          ) : (
            <MessageBubble key={`m-${i}`} message={item.msg} />
          )
        )}
      </div>

      {/* CTA suggestion buttons */}
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-2 px-4 pb-2 shrink-0">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={handleSuggestionClick}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-[14px] font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    )}

      {/* Input */}
      <div className="border-t p-3 shrink-0">
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything…"
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-md p-1 text-primary hover:bg-accent disabled:opacity-40 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

/* ─── Thinking Bubble ─── */

function ThinkingBubble({ lines, shouldCollapse }: { lines: string[]; shouldCollapse: boolean }) {
  const [revealedCount, setRevealedCount] = useState(1);

  // Space lines evenly across a total duration so they feel natural
  const totalDuration = Math.max(lines.length * 800, 2600); // at least 2.6s total
  const delayPerLine = lines.length > 1 ? totalDuration / lines.length : 900;

  useEffect(() => {
    if (revealedCount >= lines.length) return;
    const timer = setTimeout(() => {
      setRevealedCount((c) => c + 1);
    }, delayPerLine);
    return () => clearTimeout(timer);
  }, [revealedCount, lines.length, delayPerLine]);

  const showDots = !shouldCollapse;

  return (
    <div className="text-[14px] text-muted-foreground italic leading-relaxed space-y-1">
      {lines.slice(0, revealedCount).map((line, i) => {
        const isLast = i === revealedCount - 1;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <span className="text-emerald-700 font-extrabold">✓</span>
            <span>
              {line}
              {isLast && showDots && (
                <span className="thinking-dots" aria-label="thinking">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              )}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Message Bubble ─── */

function MessageBubble({ message }: { message: ChatMsg }) {
  const isUser = message.role === "user";
  const label = isUser ? "Taylor" : "qbiq";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
    >
      <span className="text-[12px] font-medium text-muted-foreground mb-1 px-1">{label}</span>
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-line",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        {message.content}
      </div>
      {message.richContent === "study-recommendation" && (
        <StudyRecommendationCard />
      )}
    </motion.div>
  );
}

/* ─── Study Recommendation Card (inline chat) ─── */

function StudyRecommendationCard() {
  const [visibleSections, setVisibleSections] = useState(0);
  const [section4TypewriterDone, setSection4TypewriterDone] = useState(false);

  useEffect(() => {
    // Only auto-reveal up to section 4; section 5 waits for typewriter
    const maxAutoSection = 4;
    const interval = setInterval(() => {
      setVisibleSections((prev) => {
        if (prev >= maxAutoSection) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (section4TypewriterDone) {
      setVisibleSections((prev) => Math.max(prev, 5));
    }
  }, [section4TypewriterDone]);

  const studies = [
    { id: "#895130", seats: 200, label: "Best match" },
    { id: "#894331", seats: 165, label: "Scalable" },
    { id: "#894304", seats: 188, label: null },
  ];

  const metrics = [
    { label: "Capacity", value: "200 seats" },
    { label: "Density", value: "10.76 m²/person" },
    { label: "Privacy score", value: "26 (balanced open / hybrid)" },
    { label: "Seating mix", value: "148 offices & focus vs. 52 open" },
    { label: "Amenity ratio", value: "0.9" },
    { label: "Conference ratio", value: "1.27" },
    { label: "Cost factor", value: "1.78 (upper-mid, not premium)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="mt-2 w-full rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden text-[14px]"
    >
      {visibleSections >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="bg-primary/10 px-3 py-2 border-b">
          <TypewriterText text="Item Management – Focused Overview" className="font-semibold text-[11px] uppercase tracking-wider text-primary" speed={25} />
        </motion.div>
      )}

      {visibleSections >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="px-3 py-2 border-b">
          <p className="font-semibold text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">Design Shortlist</p>
          <p className="text-muted-foreground text-[10px] mb-2">Best fits for approximately 200 employees:</p>
          <div className="flex flex-col gap-1.5">
            {studies.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.25 }} className="flex items-center justify-between rounded-md bg-muted/50 px-2.5 py-1.5">
                <span className="font-mono font-medium text-foreground">Study {s.id}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">{s.seats} seats</span>
                  {s.label && <span className="rounded-full bg-primary/15 text-primary px-1.5 py-0.5 text-[9px] font-semibold">{s.label}</span>}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 italic">All shortlisted options are AI-generated and not yet Qbiq-verified.</p>
        </motion.div>
      )}

      {visibleSections >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="px-3 py-2 border-b">
          <p className="font-semibold text-[11px] text-primary mb-0.5">★ Recommended Study</p>
          <p className="text-foreground text-[11px] font-medium mb-2">Primary choice: Study #895130</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Key metrics:</p>
          <div className="flex flex-col gap-0.5">
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: i * 0.15 }} className="flex items-start gap-1">
                <span className="text-muted-foreground whitespace-nowrap">{m.label}:</span>
                <span className="font-medium text-foreground">{m.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {visibleSections >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="px-3 py-2 border-b">
          <p className="font-semibold text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Why This Works for Software Teams</p>
          <ChainedTypewriter
            items={[
              { text: "This layout strongly supports engineering and software development work. It provides a high number of enclosed and quiet focus seats while maintaining sufficient collaboration areas and meeting rooms.", className: "text-muted-foreground leading-relaxed" },
              { text: "The density is efficient without feeling cramped and aligns well with contemporary tech-HQ standards. Costs remain reasonable compared to higher-privacy, more expensive schemes.", className: "text-muted-foreground leading-relaxed mt-1.5" },
              { text: "The plan also allows flexibility in desk and room allocation, enabling:", className: "text-muted-foreground leading-relaxed mt-1.5" },
              { text: "• Agile squad structures", className: "text-muted-foreground leading-relaxed ml-3" },
              { text: "• Dedicated project rooms", className: "text-muted-foreground leading-relaxed ml-3" },
              { text: "• Future refinements for hybrid work patterns", className: "text-muted-foreground leading-relaxed ml-3" },
            ]}
            speed={15}
            onComplete={() => setSection4TypewriterDone(true)}
          />
        </motion.div>
      )}

      {visibleSections >= 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="px-3 py-2 bg-muted/30">
          <p className="font-semibold text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Bottom line</p>
          <TypewriterText text="This space can evolve into a focused yet collaborative engineering hub, supporting deep, code-heavy work and product collaboration—without overspending on ultra-premium space or fully cellular office layouts." className="text-foreground font-semibold leading-relaxed" speed={18} />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Typewriter Text ─── */

function TypewriterText({ text, className, speed = 18, delay = 0, onComplete }: { text: string; className?: string; speed?: number; delay?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(delay === 0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, text, speed, started, onComplete]);

  if (!started) return <p className={className}>&nbsp;</p>;

  return (
    <p className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-foreground/60 ml-[1px] animate-pulse align-text-bottom" />
      )}
    </p>
  );
}

/* ─── Chained Typewriter ─── */

function ChainedTypewriter({ items, speed = 15, onComplete }: { items: { text: string; className?: string }[]; speed?: number; onComplete?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {items.map((item, i) => {
        if (i > activeIndex) return null;
        return (
          <TypewriterText
            key={i}
            text={item.text}
            className={item.className}
            speed={speed}
            onComplete={() => {
              if (i === activeIndex) {
                if (i < items.length - 1) {
                  setActiveIndex(i + 1);
                } else {
                  onComplete?.();
                }
              }
            }}
          />
        );
      })}
    </>
  );
}
