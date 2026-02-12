import { motion } from "framer-motion";
import { Play, Pause, Volume2, Maximize, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const CHAPTERS = [
  { title: "Lobby & Reception", time: "0:00", duration: "1:24" },
  { title: "Open Workspace – L3", time: "1:24", duration: "2:10" },
  { title: "Executive Suite – L8", time: "3:34", duration: "1:48" },
  { title: "Amenity Floor – L5", time: "5:22", duration: "2:05" },
  { title: "Rooftop Terrace", time: "7:27", duration: "1:33" },
];

export function VideoPlayer({ videoSrc }: { videoSrc?: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {/* Player */}
      <div className="relative aspect-video rounded-lg border bg-card shadow-subtle overflow-hidden">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            onLoadedMetadata={() => {
              const v = videoRef.current;
              if (v) setDuration(formatTime(v.duration));
            }}
            onTimeUpdate={() => {
              const v = videoRef.current;
              if (v && v.duration) {
                setProgress((v.currentTime / v.duration) * 100);
                setCurrentTime(formatTime(v.currentTime));
              }
            }}
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <div className="absolute inset-0 bg-muted/40" />
        )}

        {/* Play overlay (show when paused) */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-elevated backdrop-blur-sm"
            >
              <Play className="h-7 w-7 ml-1" />
            </motion.button>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold text-foreground bg-card/80 backdrop-blur-sm rounded-md px-3 py-1.5 shadow-subtle">
            Design Option A — Walkthrough
          </p>
        </div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4">
          <span className="text-[11px] font-medium text-foreground bg-card/80 backdrop-blur-sm rounded-md px-2.5 py-1 shadow-subtle">
            {duration}
          </span>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/30 to-transparent p-4 pt-10">
          {/* Progress bar */}
          <div
            className="relative h-1 rounded-full bg-muted-foreground/30 mb-3 cursor-pointer group"
            onClick={(e) => {
              const v = videoRef.current;
              if (!v) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              v.currentTime = pct * v.duration;
            }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <Volume2 className="h-4 w-4 text-primary-foreground/70" />
              <span className="text-[11px] text-primary-foreground/70 font-medium">{currentTime} / {duration}</span>
            </div>
            <button className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ChaptersCard() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-lg border bg-card shadow-subtle h-full flex flex-col"
    >
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold">Chapters</h3>
        <p className="text-xs text-muted-foreground mt-0.5">5 sections • 9:00 total</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {CHAPTERS.map((ch, i) => (
          <motion.button
            key={ch.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            onClick={() => setActive(i)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b last:border-0 transition-colors ${
              active === i ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/30"
            }`}
          >
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
              active === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-medium truncate ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                {ch.title}
              </p>
              <p className="text-[10px] text-muted-foreground">{ch.time} • {ch.duration}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
