"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

/** A gentle fade-up the first time something scrolls into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A shell command you can copy with one click. */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          // Clipboard blocked; the command is still on screen to select by hand.
        }
      }}
      className="press group flex w-full items-center gap-3 rounded-xl bg-black/40 px-4 py-3 text-left font-mono text-[13px] text-white/80 ring-1 ring-white/10 transition-colors duration-200 hover:bg-black/55"
      aria-label={`Copy command: ${command}`}
    >
      <span className="text-white/35">$</span>
      <span className="min-w-0 flex-1 truncate">{command}</span>
      <span className="relative grid h-5 w-12 place-items-center text-[11px] font-sans text-white/50">
        <span className={`absolute transition-all duration-200 ${copied ? "scale-90 opacity-0 blur-[2px]" : ""}`}>Copy</span>
        <span className={`absolute text-[rgb(128_230_173)] transition-all duration-200 ${copied ? "" : "scale-90 opacity-0 blur-[2px]"}`}>
          Copied
        </span>
      </span>
    </button>
  );
}
