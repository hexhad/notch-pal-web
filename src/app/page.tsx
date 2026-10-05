import { CopyCommand, Reveal } from "@/components/Bits";
import { CountHex, Hex, UsageHex } from "@/components/Hex";
import { LiquidGlass } from "@/components/LiquidGlass";
import { NotchDemo } from "@/components/NotchDemo";
import { HeroGradient, LiquidHex } from "@/components/Visuals";
import { release, states } from "@/lib/site";

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <Nav />
      <Hero />
      <States />
      <Features />
      <Install />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function DownloadButton({ size = "lg" }: { size?: "lg" | "md" }) {
  return (
    <a
      href={release.dmg}
      download
      className={`press group inline-flex items-center gap-3 rounded-full bg-white font-medium text-black transition-[background-color,transform] duration-200 hover:bg-white/90 ${
        size === "lg" ? "py-2 pl-6 pr-2 text-[15px]" : "py-1.5 pl-4 pr-1.5 text-sm"
      }`}
    >
      Download for Mac
      <span
        className={`grid place-items-center rounded-full bg-black/[0.07] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5 ${
          size === "lg" ? "size-9" : "size-7"
        }`}
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M8 2.5v9M4 8l4 4 4-4M3 14h10" />
        </svg>
      </span>
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <LiquidGlass className="flex w-full max-w-xl items-center gap-2 py-1.5 pl-4 pr-1.5">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Hex state="idle" size={20} />
          NotchPal
        </a>
        <nav className="ml-auto hidden items-center gap-1 text-[13px] text-white/60 sm:flex">
          <a href="#states" className="rounded-full px-3 py-1.5 transition-colors duration-200 hover:text-white">
            States
          </a>
          <a href="#features" className="rounded-full px-3 py-1.5 transition-colors duration-200 hover:text-white">
            Features
          </a>
          <a href="#install" className="rounded-full px-3 py-1.5 transition-colors duration-200 hover:text-white">
            Install
          </a>
        </nav>
        <div className="ml-auto sm:ml-1">
          <DownloadButton size="md" />
        </div>
      </LiquidGlass>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] flex-col items-center px-4 pb-24 pt-32 sm:pt-40">
      <HeroGradient />
      <Reveal className="w-full max-w-5xl text-center">
        <h1 className="mx-auto max-w-5xl text-balance text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Your Claude Code sessions,
          <br className="hidden sm:block" /> living in the notch.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-white/60">
          A small animated hexagon beside your MacBook&apos;s camera shows whether Claude is thinking, working or waiting on
          you. Click it to jump straight to the session.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <DownloadButton />
          <p className="text-[13px] text-white/40">
            v{release.version} · {release.size} · Universal · {release.minOS} or later
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-16 w-full max-w-5xl sm:mt-20">
        <NotchDemo />
      </Reveal>
    </section>
  );
}

function States() {
  return (
    <section id="states" className="relative px-4 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Every state reads at a glance, out of the corner of your eye.
          </h2>
          <p className="mt-5 max-w-xl text-white/55">
            Each Claude Code event changes the hexagon&apos;s colour and motion. When a turn finishes it draws a check, then
            poofs away.
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] bg-white/[0.06] ring-1 ring-white/[0.08] sm:grid-cols-3">
          {states.map((s, i) => (
            <Reveal key={s.state} delay={(i % 3) * 0.06} className="bg-[#08080c]">
              <div className="flex items-center gap-5 px-6 py-7">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-black ring-1 ring-white/[0.06]">
                  <Hex state={s.state} size={34} />
                </span>
                <span>
                  <span className="block font-medium">{s.label}</span>
                  <span className="mt-0.5 block text-sm text-white/45">{s.trigger}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={`rounded-[2rem] bg-white/[0.04] p-1.5 ring-1 ring-white/[0.08] ${className}`}>
      <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#0a0a10] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-9">
        {children}
      </div>
    </Reveal>
  );
}

function Features() {
  return (
    <section id="features" className="px-4 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Built to stay out of the way until you&apos;re needed.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-6">
          <Card className="md:col-span-4 md:row-span-2">
            <h3 className="text-xl font-semibold tracking-tight">Click to jump to the session</h3>
            <p className="mt-3 max-w-md text-white/55">
              The hexagon knows where each session runs. One click brings that window forward: Terminal, iTerm, VS Code,
              Cursor or the Claude app.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Terminal", "iTerm", "VS Code", "Cursor", "Claude"].map((app) => (
                <span key={app} className="rounded-full bg-white/[0.05] px-4 py-2 text-sm text-white/70 ring-1 ring-white/[0.08]">
                  {app}
                </span>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-3 rounded-2xl bg-black p-4 ring-1 ring-white/[0.06] sm:w-max">
              <CountHex count={3} alert size={38} />
              <Hex state="approval" size={38} />
              <span className="ml-2 text-sm text-white/55">
                Three sessions. The one that needs you takes the slot,
                <br className="hidden sm:block" /> and the count turns amber if another is waiting too.
              </span>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="flex items-center gap-3">
              <UsageHex left={84} size={44} />
              <UsageHex left={22} size={44} />
              <UsageHex left={8} size={44} />
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">Plan usage, by the notch</h3>
            <p className="mt-2 text-sm text-white/55">
              What&apos;s left of your session and week, the same numbers as <code className="font-mono text-white/75">/usage</code>.
              Amber at 25%, red at 10%.
            </p>
          </Card>

          <Card className="md:col-span-2">
            <h3 className="text-lg font-semibold tracking-tight">Never slows Claude down</h3>
            <p className="mt-2 text-sm text-white/55">
              Hooks post to <code className="font-mono text-white/75">127.0.0.1</code>. If NotchPal isn&apos;t running they
              fail instantly and silently.
            </p>
          </Card>

          <Card className="md:col-span-3">
            <h3 className="text-lg font-semibold tracking-tight">Private by design</h3>
            <p className="mt-2 text-sm text-white/55">
              Everything stays on your Mac. The usage readout borrows Claude Code&apos;s own login to ask Anthropic for your
              plan numbers, and never stores or refreshes the token.
            </p>
          </Card>

          <Card className="md:col-span-3">
            <h3 className="text-lg font-semibold tracking-tight">Drive it from anything</h3>
            <p className="mt-2 text-sm text-white/55">Any script can set a hexagon&apos;s state with one request.</p>
            <pre className="mt-5 overflow-x-auto rounded-xl bg-black/50 p-4 font-mono text-[12px] leading-relaxed text-white/70 ring-1 ring-white/[0.06]">
              {`curl -d '{"session_id":"build","state":"working"}' \\
  http://127.0.0.1:47821/hook`}
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Install() {
  const steps = [
    {
      title: "Download and drag to Applications",
      body: "Open the disk image and drag NotchPal into your Applications folder.",
    },
    {
      title: "Allow the first launch",
      body: "The build isn't notarized, so macOS blocks it once. Open System Settings, Privacy & Security, and click Open Anyway. Or run:",
      command: "xattr -dr com.apple.quarantine /Applications/NotchPal.app",
    },
    {
      title: "Connect to Claude Code",
      body: "From the hexagon in the menu bar, choose Connect to Claude Code, then turn on Open at login. Start claude and send a prompt.",
    },
  ];
  return (
    <section id="install" className="px-4 py-32 md:py-44">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Reveal>
          <h2 className="text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Up and running in a minute.
          </h2>
          <p className="mt-5 max-w-sm text-white/55">
            Requires {release.minOS} or later. One universal build for Apple silicon and Intel.
          </p>
          <div className="mt-8">
            <DownloadButton />
          </div>
        </Reveal>
        <ol className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="flex gap-5 rounded-[1.5rem] bg-white/[0.03] p-6 ring-1 ring-white/[0.07]">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.07] text-sm font-medium tabular-nums text-white/70">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.body}</p>
                  {s.command && (
                    <div className="mt-4">
                      <CopyCommand command={s.command} />
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative px-4 py-32 md:py-48">
      <div aria-hidden className="cta-glow" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <LiquidHex size={200} />
        <h2 className="mt-8 text-balance text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Stop checking the terminal.
        </h2>
        <p className="mt-5 max-w-md text-white/55">Let the notch tell you when Claude needs you.</p>
        <div className="mt-10">
          <DownloadButton />
        </div>
        <p className="mt-6 max-w-full break-all font-mono text-[11px] text-white/30">SHA-256 {release.sha256}</p>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-white/40 sm:flex-row sm:items-center">
        <span className="flex items-center gap-2 text-white/70">
          <Hex state="idle" size={18} /> NotchPal
        </span>
        <span className="sm:ml-auto">© {new Date().getFullYear()} NotchPal</span>
      </div>
    </footer>
  );
}
