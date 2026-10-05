export const release = {
  version: "0.2.1",
  dmg: "/downloads/NotchPal-0.2.1.dmg",
  size: "1.4 MB",
  sha256: "adfdd308490987428333f5dcfda81b742b96d66f1cd3a6b42159b847d9755f60",
  minOS: "macOS 13",
};

export type BotState =
  | "greeting"
  | "idle"
  | "thinking"
  | "working"
  | "searching"
  | "approval"
  | "question"
  | "finished"
  | "error"
  | "sleeping";

/** Tints straight from BotState.swift, so the site matches the app pixel for pixel. */
export const tint: Record<BotState, string> = {
  greeting: "rgb(237 240 245)",
  idle: "rgb(237 240 245)",
  thinking: "rgb(184 158 250)",
  working: "rgb(122 179 255)",
  searching: "rgb(153 158 250)",
  approval: "rgb(255 194 92)",
  question: "rgb(107 219 235)",
  finished: "rgb(128 230 173)",
  error: "rgb(255 115 122)",
  sleeping: "rgb(204 209 224)",
};

export const states: { state: BotState; label: string; trigger: string }[] = [
  { state: "greeting", label: "Saying hi", trigger: "A session starts" },
  { state: "thinking", label: "Thinking", trigger: "You send a prompt" },
  { state: "searching", label: "Reading files", trigger: "Read, Grep, Glob, Web" },
  { state: "working", label: "Working", trigger: "Any other tool" },
  { state: "approval", label: "Needs approval", trigger: "A permission request" },
  { state: "question", label: "Waiting for you", trigger: "Claude asks a question" },
  { state: "error", label: "Hit an error", trigger: "A tool or turn fails" },
  { state: "finished", label: "Done", trigger: "The turn finishes" },
  { state: "sleeping", label: "Asleep", trigger: "Quiet for 10 minutes" },
];
