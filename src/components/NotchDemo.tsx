"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CountHex, Hex, UsageHex } from "@/components/Hex";
import type { BotState } from "@/lib/site";

type Step = {
  state: BotState | null; // null: no session, the island is just the notch + usage
  others?: number; // extra sessions running in the background
  alert?: boolean; // a hidden session is waiting on you
  line: string;
  ms: number;
  usage?: number;
};

/** One scripted Claude Code turn, looped. */
const script: Step[] = [
  { state: null, line: "~/notch-pal  $", ms: 1800 },
  { state: "greeting", line: "$ claude", ms: 1500 },
  { state: "thinking", line: "> fix the flaky upload test", ms: 2200 },
  { state: "searching", line: "Read tests/upload.spec.ts", ms: 2000 },
  { state: "working", line: "Edit src/upload/retry.ts", ms: 2000, others: 1 },
  { state: "approval", line: "Allow Bash(npm test)?  1. Yes  2. No", ms: 2600, others: 1, usage: 96 },
  { state: "working", line: "Bash npm test  ✓ 48 passed", ms: 2000, others: 1, alert: true },
  { state: "finished", line: "Done. The retry waits for the socket to close.", ms: 1900, others: 1 },
  { state: null, line: "~/notch-pal  $", ms: 1600, usage: 95 },
];

export function NotchDemo() {
  const [i, setI] = useState(0);
  const step = script[i];

  useEffect(() => {
    const id = setTimeout(() => setI((n) => (n + 1) % script.length), step.ms);
    return () => clearTimeout(id);
  }, [i, step.ms]);

  const usage = script.slice(0, i + 1).reduce((u, s) => s.usage ?? u, 97);
  const sessions = step.state ? 1 + (step.others ?? 0) : 0;

  return (
    <div className="demo-frame" role="img" aria-label="A MacBook menu bar with the NotchPal island around the camera notch">
      <div className="demo-screen">
        <div className="demo-wallpaper" />
        <div className="demo-menubar">
          <span className="font-semibold text-white/90">Terminal</span>
          <span className="hidden sm:inline">Shell</span>
          <span className="hidden sm:inline">Edit</span>
          <span className="hidden md:inline">View</span>
          <span className="ml-auto tabular-nums">Mon 9:41</span>
        </div>

        <Island state={step.state} sessions={sessions} alert={!!step.alert} usage={usage} />

        <div className="demo-terminal">
          <div className="flex gap-1.5 pb-3">
            <i className="size-2.5 rounded-full bg-white/15" />
            <i className="size-2.5 rounded-full bg-white/15" />
            <i className="size-2.5 rounded-full bg-white/15" />
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={step.line}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="font-mono text-[13px] text-white/75 sm:text-sm"
            >
              {step.line}
              <span className="caret" />
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Reveal from the notch outward. The final inset reaches past the left edge so the flare isn't clipped.
const grow = {
  initial: { clipPath: "inset(0% 0% 0% 100%)", opacity: 0.4 },
  animate: { clipPath: "inset(0% 0% 0% -25%)", opacity: 1 },
  exit: { clipPath: "inset(0% 0% 0% 100%)", opacity: 0.4 },
};

/**
 * The island, built like the app: the black ear on the left grows out of the notch,
 * the notch itself, and the usage ear on the right. Pieces share one black, so they read as one shape.
 */
function Island({
  state,
  sessions,
  alert,
  usage,
}: {
  state: BotState | null;
  sessions: number;
  alert: boolean;
  usage: number;
}) {
  const spring = { type: "spring", duration: 0.55, bounce: 0.18 } as const;
  return (
    <div className="island">
      <div className="flex justify-end">
        <AnimatePresence initial={false}>
          {state && (
            <motion.div key="ear" className="island-ear island-left" {...grow} transition={spring}>
              <i className="flare flare-left" />
              <AnimatePresence initial={false}>
                {sessions > 1 && (
                  <motion.span
                    key="count"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={spring}
                    className="grid place-items-center"
                  >
                    <CountHex count={sessions} alert={alert} size="0.7em" />
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span layout="position" transition={spring} className="grid place-items-center">
                <Hex state={state} size="0.7em" />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`island-notch ${state ? "" : "rounded-bl-[0.42em]"}`}>
        {!state && <i className="flare flare-left" />}
        <i className="camera" />
      </div>

      <div className="flex justify-start">
        <div className="island-ear island-right">
          <i className="flare flare-right" />
          <UsageHex left={usage} size="0.7em" />
          <span className="flex flex-col leading-none">
            <span className="text-[0.3em] font-semibold text-white/90 tabular-nums">4h 52m</span>
            <span className="mt-[0.12em] text-[0.26em] font-medium text-white/55 tabular-nums">wk 84%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
