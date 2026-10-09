import type { Metadata } from "next";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { Hex } from "@/components/Hex";
import { android } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy · NotchPal for Android",
  description: "What NotchPal for Android stores, what it sends to your Mac, and what it never collects.",
  alternates: { canonical: "/privacy" },
};

const effective = "9 October 2026";

export default function Privacy() {
  return (
    <main className="w-full max-w-full overflow-x-hidden px-4 pb-24 pt-10 sm:pt-16">
      <article className="mx-auto max-w-2xl text-[15px] leading-relaxed text-white/70">
        <NextLink href="/" className="press inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <Hex state="idle" size={20} />
          NotchPal
        </NextLink>

        <h1 className="mt-12 text-balance text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
          Privacy Policy
        </h1>
        <p className="mt-3 text-white/45">NotchPal for Android · Effective {effective}</p>

        <p className="mt-8">
          NotchPal for Android (package <Code>com.hexhad.notchpal</Code>) lets you follow and answer your Mac&rsquo;s Claude
          Code sessions from your phone. It talks only to the NotchPal app on your own Mac, over your local Wi&#8209;Fi. This
          policy explains what the app handles and where that data goes.
        </p>

        <div className="mt-8 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.08]">
          <p className="font-medium text-white">The short version</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-white/30">
            <li>No account, no sign-up, and no ads.</li>
            <li>No analytics, tracking, or crash reporting.</li>
            <li>The developer runs no servers and never receives your data.</li>
            <li>Everything the app sends goes to the Mac you paired with, on your local network.</li>
          </ul>
        </div>

        <Section title="Data stored on your phone">
          <p>The app keeps a small settings file in its private storage:</p>
          <List>
            <li>The paired Mac&rsquo;s name and local network address.</li>
            <li>A random access token the Mac issues when you pair. It lets the phone talk to that Mac.</li>
            <li>Your preferences: notification choices, background watching, and theme.</li>
          </List>
          <p>
            Android backup is turned off for the app, so none of this is copied to Google Drive or other devices. Uninstalling
            the app, or clearing its storage, deletes all of it.
          </p>
        </Section>

        <Section title="Data exchanged with your Mac">
          <p>
            The app connects directly to your Mac on your local network. Nothing passes through the developer or any cloud
            service.
          </p>
          <p className="font-medium text-white">Sent from your phone to your Mac:</p>
          <List>
            <li>
              When you pair: the 6-digit pairing code and your phone&rsquo;s name (the device name set in Android settings, or
              its make and model). The Mac shows this name in its list of paired phones.
            </li>
            <li>Your decisions on permission requests (Allow, Deny, Always allow, Answer on Mac).</li>
            <li>
              Messages you type to a Claude Code session, and requests to start a new session in one of your recent project
              folders.
            </li>
          </List>
          <p className="font-medium text-white">Received from your Mac:</p>
          <List>
            <li>Your Claude Code session list: state, project name, the app each session runs in, and timing.</li>
            <li>
              Details of permission requests, which can include the tool, the command it wants to run, and file paths on your
              Mac.
            </li>
            <li>Your Claude plan usage (session and weekly).</li>
          </List>
          <p>
            This information is shown in the app and in notifications, and is held in memory only while the app is running.
            It is not written to the phone&rsquo;s storage.
          </p>
          <p>
            The connection uses plain HTTP on your local network and is not encrypted. Anyone else on the same network could
            observe it, so use the app only on networks you trust.
          </p>
        </Section>

        <Section title="Local network discovery">
          <p>
            The app uses Bonjour (mDNS) to find NotchPal Macs on your Wi&#8209;Fi and to find your Mac again if its address
            changes. This only happens on your local network.
          </p>
        </Section>

        <Section title="Scanning the pairing QR code">
          <p>
            The <strong className="font-medium text-white">Scan QR code</strong> button uses the Google code scanner provided by
            Google Play services. The scanner runs inside Google Play services, and the app receives only the text of the QR
            code (your Mac&rsquo;s address and pairing code). The app itself does not request camera permission and never sees
            camera images. Google&rsquo;s handling of data in Play services is covered by the{" "}
            <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>.
          </p>
          <p>You can also pair without the scanner by typing the code, or by scanning the QR with any camera app.</p>
        </Section>

        <Section title="App updates">
          <p>
            The app uses Google Play&rsquo;s in-app update service to check whether a newer version is available. That check is
            handled by Google Play and covered by the Google Privacy Policy.
          </p>
        </Section>

        <Section title="Permissions">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/[0.08]">
            {permissions.map(([name, why]) => (
              <div
                key={name}
                className="grid gap-1 border-t border-white/[0.06] px-4 py-3 first:border-t-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4"
              >
                <span className="text-white">{name}</span>
                <span>{why}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Revoking access">
          <List>
            <li>
              On the Mac, <strong className="font-medium text-white">Forget paired phones</strong> in the NotchPal menu revokes
              every phone&rsquo;s token.
            </li>
            <li>On the phone, uninstall the app or clear its storage to delete the saved Mac and token.</li>
          </List>
        </Section>

        <Section title="Children">
          <p>
            The app is a developer tool and is not directed at children under 13. It does not knowingly collect data from
            anyone.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>If this policy changes, the new version will be published on this page with a new effective date.</p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy can be raised as an issue at{" "}
            <ExternalLink href={`${android.repo}/issues`}>{android.repo.replace("https://", "")}/issues</ExternalLink>.
          </p>
        </Section>
      </article>
    </main>
  );
}

const permissions: [string, string][] = [
  ["Internet, network state, Wi‑Fi state", "To connect to your Mac on the local network"],
  ["Wi‑Fi multicast, change network state", "To find your Mac over Bonjour"],
  ["Notifications", "To alert you about approvals, finished sessions, errors, and low plan usage"],
  [
    "Foreground service (connected device)",
    "Only if you turn on Keep watching in the background, so alerts arrive while the app is closed",
  ],
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5 marker:text-white/30">{children}</ul>;
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-white/80">{children}</code>;
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="break-words text-white underline decoration-white/25 underline-offset-4 hover:decoration-white/60">
      {children}
    </a>
  );
}
