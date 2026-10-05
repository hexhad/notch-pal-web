import { tint, type BotState } from "@/lib/site";

/** Pointy-top hexagon with rounded corners, the same outline HexRenderer draws. */
export function hexPath(r: number, corner = 0.24) {
  const c = r * corner;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  });
  const lerp = (a: readonly number[], b: readonly number[], t: number) =>
    [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] as const;
  const side = r; // a regular hexagon's side equals its radius
  const t = c / side;
  let d = "";
  pts.forEach((p, i) => {
    const prev = pts[(i + 5) % 6];
    const next = pts[(i + 1) % 6];
    const a = lerp(p, prev, t);
    const b = lerp(p, next, t);
    d += `${i === 0 ? "M" : "L"}${a[0].toFixed(2)},${a[1].toFixed(2)} Q${p[0].toFixed(2)},${p[1].toFixed(2)} ${b[0].toFixed(2)},${b[1].toFixed(2)} `;
  });
  return d + "Z";
}

const R = 38;
const HEX = hexPath(R);

/**
 * One session hexagon. Each state gets its tint and a small CSS motion, a lighter
 * cousin of the per-frame drawing in the app.
 */
export function Hex({ state, size = 40, className = "" }: { state: BotState; size?: number | string; className?: string }) {
  const color = tint[state];
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={`hex hex-${state} ${className}`}
      style={{ color }}
      aria-hidden
    >
      <g className="hex-body">
        <path d={HEX} fill="none" stroke="currentColor" strokeOpacity={0.22} strokeWidth={7} />
        <path
          d={HEX}
          fill="none"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          pathLength={100}
          className="hex-ring"
        />
        <Glyph state={state} />
      </g>
    </svg>
  );
}

function Glyph({ state }: { state: BotState }) {
  switch (state) {
    case "thinking":
      return (
        <g fill="currentColor">
          {[-13, 0, 13].map((x, i) => (
            <circle key={x} cx={x} cy={0} r={4.6} className="hex-dot" style={{ animationDelay: `${i * 0.14}s` }} />
          ))}
        </g>
      );
    case "searching":
      return (
        <g fill="currentColor" className="hex-eyes">
          <circle cx={-8} cy={0} r={4.6} />
          <circle cx={8} cy={0} r={4.6} />
        </g>
      );
    case "approval":
      return (
        <g className="hex-hop" fill="currentColor">
          <rect x={-3.6} y={-17} width={7.2} height={20} rx={3.6} />
          <circle cx={0} cy={12} r={4.2} />
        </g>
      );
    case "question":
      return (
        <g className="hex-hop">
          <path
            d="M-8,-8 C-8,-17 8,-17 8,-8 C8,-2 0,-1 0,5"
            fill="none"
            stroke="currentColor"
            strokeWidth={6.4}
            strokeLinecap="round"
          />
          <circle cx={0} cy={14} r={4} fill="currentColor" />
        </g>
      );
    case "finished":
      return (
        <path
          d="M-12,1 L-3,10 L13,-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={6.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="hex-check"
        />
      );
    case "error":
      return (
        <g stroke="currentColor" strokeWidth={6.4} strokeLinecap="round">
          <path d="M-8,-8 L8,8 M8,-8 L-8,8" />
        </g>
      );
    case "sleeping":
      return <path d="M-11,2 Q0,9 11,2" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />;
    case "working":
      return <circle r={9} fill="currentColor" className="hex-squish" />;
    default:
      return <circle r={8} fill="currentColor" />;
  }
}

/** The count hexagon that sits left of the session once there's more than one. */
export function CountHex({ count, alert = false, size = 40 }: { count: number; alert?: boolean; size?: number | string }) {
  const color = alert ? tint.approval : "rgb(255 255 255 / 0.55)";
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} aria-hidden style={{ color }}>
      <path d={HEX} fill="none" stroke="currentColor" strokeWidth={6} strokeLinejoin="round" />
      <text
        x={0}
        y={1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={38}
        fontWeight={700}
        fill={alert ? color : "rgb(255 255 255 / 0.9)"}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count}
      </text>
    </svg>
  );
}

/** The usage hexagon on the right of the notch: it drains clockwise as the limit is used. */
export function UsageHex({ left, size = 40 }: { left: number; size?: number | string }) {
  const color = left <= 10 ? tint.error : left <= 25 ? tint.approval : "rgb(255 255 255 / 0.92)";
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} aria-hidden style={{ color }}>
      <path d={HEX} fill="none" stroke="currentColor" strokeOpacity={0.22} strokeWidth={6} />
      <path
        d={HEX}
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${left} 100`}
        style={{ transition: "stroke-dasharray 900ms cubic-bezier(0.23, 1, 0.32, 1)" }}
      />
      <text
        x={0}
        y={1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={left >= 100 ? 26 : 32}
        fontWeight={700}
        fill="currentColor"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {left}
      </text>
    </svg>
  );
}
