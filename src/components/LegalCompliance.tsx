import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const LEGAL_ACK_KEY = "ita_legal_ack_v1";
export const hasLegalAck = () => {
  try { return !!localStorage.getItem(LEGAL_ACK_KEY); } catch { return false; }
};
export const setLegalAck = () => {
  try { localStorage.setItem(LEGAL_ACK_KEY, new Date().toISOString()); } catch {}
};
const LS_KEY = LEGAL_ACK_KEY;


const SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. RISK DISCLOSURE & EDUCATIONAL USE ONLY",
    body: "Trading financial instruments, including Foreign Exchange (Forex), Cryptocurrencies, Stocks, and Futures, carries a high level of risk and may not be suitable for all investors. High leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment; therefore, you should not invest money that you cannot afford to lose. Irfan's Trading Academy is an independent online educational platform. All content, materials, strategies (including CHoCH, FVG, and Moon Cycles), and tools provided on this website are strictly for educational and informational purposes only. Nothing published on this site constitutes personalized financial, investment, or tax advice. Irfan Chulaqov is not a licensed financial advisor, broker, or registered investment consultant. You should consult a licensed professional before making any real market financial decisions. You are fully responsible for your own trading actions.",
  },
  {
    title: "2. EARNINGS & PERFORMANCE DISCLAIMER",
    body: "Any testimonials, trade receipts, account balances, or case studies shown on this website are individual results and do not guarantee future success. Past performance of any trading strategy or indicator is not indicative of future results. Trading outcomes depend heavily on personal discipline, market volatility, and individual execution. Irfan's Trading Academy makes no representations or warranties that any user will achieve profits similar to those discussed.",
  },
  {
    title: "3. INTELLECTUAL PROPERTY NOTICE",
    body: "All course materials, visual graphics, strategy charts, branding, and text assets featured on this platform are the exclusive intellectual property of Irfan's Trading Academy. Unauthorized reproduction, screenshotting for commercial use, distribution, or resale of these materials is strictly prohibited and subject to legal action.",
  },
];

export function LegalModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-md border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border bg-card/80 px-5 py-3">
          <h2 id="legal-modal-title" className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Privacy Policy &amp; Terms &amp; Legal Notices
          </h2>
          <button
            onClick={onClose}
            aria-label="Close legal notices"
            className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 text-muted-foreground" style={{ fontSize: "10.5px", lineHeight: "1.35" }}>
          <p className="mb-3 font-semibold uppercase tracking-wide text-foreground" style={{ fontSize: "10px" }}>
            Effective 2026 · Read in full before purchasing or using any materials.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.title} className="mb-4">
              <h3 className="mb-1 font-semibold uppercase tracking-wide text-foreground" style={{ fontSize: "10px" }}>
                {s.title}
              </h3>
              <p className="text-justify">{s.body}</p>
            </div>
          ))}
          <p className="mt-4 border-t border-border pt-3 text-center font-medium text-foreground" style={{ fontSize: "10px" }}>
            © 2026 Irfan's Trading Academy. All Rights Reserved.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-card/80 px-5 py-3">
          <button
            onClick={() => { setLegalAck(); onClose(); }}
            className="rounded bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Accept &amp; Continue
          </button>
          <button
            onClick={onClose}
            className="rounded border border-border px-4 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieBanner({ onOpenLegal }: { onOpenLegal: () => void }) {
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    try {
      if (!localStorage.getItem(LS_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(LS_KEY, new Date().toISOString());
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between">
        <p className="text-muted-foreground" style={{ fontSize: "11px", lineHeight: "1.4" }}>
          This website uses cookies and provides trading education only. Not financial advice. Trading carries high risk of loss.
          By continuing you acknowledge our{" "}
          <button onClick={onOpenLegal} className="underline underline-offset-2 hover:text-foreground">
            Risk Disclosure, Earnings Disclaimer &amp; Terms
          </button>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={onOpenLegal}
            className="rounded border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
          >
            View details
          </button>
          <button
            onClick={accept}
            className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Accept &amp; continue
          </button>
        </div>
      </div>
    </div>
  );
}
