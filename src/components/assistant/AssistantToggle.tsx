import { MessageSquare } from "lucide-react";
import { useAssistant } from "@/contexts/AssistantContext";
import { motion, AnimatePresence } from "framer-motion";

export function AssistantToggle() {
  const { open, toggle } = useAssistant();

  return (
    <AnimatePresence>
      {!open && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={toggle}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated hover:scale-105 transition-transform"
        >
          <MessageSquare className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
