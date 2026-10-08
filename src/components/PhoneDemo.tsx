"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Hex, UsageHex } from "@/components/Hex";
import type { BotState } from "@/lib/site";
import { tint } from "@/lib/site";

type Session = { id: string; project: string; task: string; state: BotState; label: string; app: string };

type Step = {
  sessions: Session[];
  ask?: boolean; // the permission request card is showing
  pressed?: boolean; // Allow is being tapped
  ms: number;
};

const api: Session = { id: "a", project: "notch-pal", task: "Fix the flaky upload test", state: "working", label: "Editing retry.ts", app: "Terminal" };
const web: Session = { id: "b", project: "notch-pal-web", task: "Add a phone section", state: "thinking", label: "Thinking", app: "Code" };

/** The Android app answering a permission request, looped. */
const script: Step[] = [
  { sessions: [api, web], ms: 1800 },
  { sessions: [{ ...api, state: "approval", label: "Needs your approval" }, web], ask: true, ms: 2400 },
  { sessions: [{ ...api, state: "approval", label: "Needs your approval" }, web], ask: true, pressed: true, ms: 380 },
  { sessions: [{ ...api, state: "working", label: "Running npm test" }, web], ms: 1700 },
  { sessions: [{ ...api, state: "finished", label: "Done" }, { ...web, state: "searching", label: "Reading files" }], ms: 2000 },
];

export function PhoneDemo() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const step = script[i];

  useEffect(() => {
    const id = setTimeout(() => setI((n) => (n + 1) % script.length), step.ms);
    return () => clearTimeout(id);
  }, [i, step.ms]);

  return (
    <div
      className="relative mx-auto w-[280px] rounded-[44px] bg-[#1b1b20] p-2.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10"
      role="img"
      aria-label="The NotchPal Android app showing a permission request with Allow and Deny"
    >
      <div className="relative h-[560px] overflow-hidden rounded-[36px] bg-[#0b0b0d] px-4 pt-10">
        <div className="absolute left-1/2 top-3 h-5 w-5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[17px] font-semibold tracking-tight text-white">Hashan&apos;s MacBook</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50">
              <span className="size-1.5 animate-pulse rounded-full" style={{ background: tint.finished }} />
              Live over Wi&#8209;Fi
            </p>
          </div>
          <span className="size-8 rounded-full bg-white/[0.06] ring-1 ring-white/10" />
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {step.ask && (
              <motion.div
                key="ask"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-[18px] bg-[#151619] p-3.5"
                style={{ boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${tint.approval} 55%, transparent)` }}
              >
                <div className="flex items-center gap-2.5">
                  <Hex state="approval" size={26} />
                  <div>
                    <p className="text-[12.5px] font-semibold text-white">notch-pal wants to use Bash</p>
                    <p className="text-[10px] text-white/45">Asks on the Mac in 1:48</p>
                  </div>
                </div>
                <p className="mt-2.5 rounded-lg bg-white/[0.05] px-2.5 py-2 font-mono text-[10.5px] text-white/80">npm test</p>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-[12px] font-semibold">
                  <span className="rounded-[10px] bg-white/[0.07] py-2 text-center text-white">Deny</span>
                  <motion.span
                    animate={{ scale: step.pressed ? 0.95 : 1 }}
                    transition={{ duration: 0.12 }}
                    className="rounded-[10px] bg-[#edeef2] py-2 text-center text-black"
                  >
                    Allow
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout={!reduce} className="rounded-[18px] bg-[#151619] p-3.5 ring-1 ring-white/[0.06]">
            <p className="text-[12px] font-semibold text-white">Claude plan</p>
            <div className="mt-2.5 flex gap-4">
              <div className="flex items-center gap-2">
                <UsageHex left={72} size={34} />
                <p className="text-[10.5px] leading-tight text-white/50">
                  <span className="block text-[11.5px] font-semibold text-white">72% left</span>Session
                </p>
              </div>
              <div className="flex items-center gap-2">
                <UsageHex left={41} size={34} />
                <p className="text-[10.5px] leading-tight text-white/50">
                  <span className="block text-[11.5px] font-semibold text-white">41% left</span>Week
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p layout={!reduce} className="mt-1 px-1 text-[12px] font-semibold text-white">
            Sessions
          </motion.p>
          {step.sessions.map((s) => (
            <motion.div
              layout={!reduce}
              key={s.id}
              className="flex items-center gap-3 rounded-[18px] bg-[#151619] p-3 transition-shadow duration-300"
              style={{
                boxShadow:
                  s.state === "approval"
                    ? `inset 0 0 0 1px color-mix(in srgb, ${tint.approval} 50%, transparent)`
                    : "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <Hex state={s.state} size={30} />
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-semibold text-white">{s.project}</p>
                <p className="truncate text-[11px] text-white/75">{s.task}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={s.label}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.18 }}
                    className="text-[11px]"
                    style={{ color: tint[s.state] }}
                  >
                    {s.label}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[10px] text-white/40">in {s.app}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
