import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import {
  Phone, MessageCircle, TrendingUp, Star, ShieldCheck, Zap, Target,
  BarChart3, LineChart, ArrowUpRight, CheckCircle2, Trophy, Users, Clock,
  ChevronDown, Menu, X, Quote,
} from "lucide-react";
import trading1 from "@/assets/trading1.png.asset.json";
import trading2 from "@/assets/trading2.jpg.asset.json";
import balance1 from "@/assets/balance1.png.asset.json";
import balance2 from "@/assets/balance2.png.asset.json";

// Code-split: legal modal + cookie banner aren't needed for first paint.
const LegalCompliance = lazy(() =>
  import("@/components/LegalCompliance").then((m) => ({
    default: ({ open, onClose, showBanner }: { open: boolean; onClose: () => void; showBanner: boolean }) => (
      <>
        <m.LegalModal open={open} onClose={onClose} />
        {showBanner && <m.CookieBanner onOpenLegal={() => {}} />}
      </>
    ),
  }))
);



const SITE_URL = "https://irfantradingacademy.lovable.app";

const FAQ_ITEMS = [
  { q: "Do you guarantee profits or provide signals to copy?", a: "No. I teach you how to read price action and find your own setups. Signal groups create dependency. I create independent traders who don't need anyone's permission to take a trade." },
  { q: "How much starting capital do I need?", a: "You can start learning with a demo account. For live trading, $500 to $1,000 is enough to apply proper risk management on micro-lots. The mindset and process matter more than account size." },
  { q: "What markets do you trade and teach?", a: "Forex (majors and crosses), US30/NAS100 indices, gold, and select crypto pairs. All strategies are price action based and work across any liquid market." },
  { q: "How are the live sessions structured?", a: "Daily London and New York sessions where we analyze pre market bias, hunt for setups together, and review trades taken. Pro and Elite members also get recorded breakdowns of every session." },
  { q: "Can I really learn this if I have zero experience?", a: "Absolutely. The Starter plan gives you the full strategy library with step by step videos. Most of my successful students started with no background in finance. Discipline beats DNA in trading." },
  { q: "How do I cancel or switch plans?", a: "Message me on WhatsApp anytime. No lock in contracts, no hidden fees. If the mentorship isn't right for you, I want you to find what works, even if that's not with me." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Irfan's Trading Academy" },
      { name: "description", content: "Learn institutional day trading strategies with honest, no hype mentorship." },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Irfan's Trading Academy",
          url: SITE_URL,
          description: "Day trading mentorship teaching institutional price action strategies including Fibonacci, ICT, and Smart Money concepts.",
          telephone: "+994 50 784 45 36",
          contactPoint: [{ "@type": "ContactPoint", telephone: "+994507844536", contactType: "customer service", availableLanguage: ["English", "Azerbaijani"] }],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const PHONE = "+994 50 784 45 36";
const PHONE_RAW = "+994507844536";
const WA = `https://wa.me/${PHONE_RAW.replace("+", "")}?text=${encodeURIComponent("Hi! I'm interested in your day trading mentorship.")}`;

const TICKERS = [
  { s: "BTC/USD", p: "67,420", c: "+2.41%" },
  { s: "EUR/USD", p: "1.0892", c: "+0.32%" },
  { s: "GBP/USD", p: "1.2641", c: "-0.18%" },
  { s: "NASDAQ", p: "18,247", c: "+1.07%" },
  { s: "TSLA", p: "422.66", c: "+3.22%" },
  { s: "AAPL", p: "297.93", c: "+0.84%" },
  { s: "GOLD", p: "2,684", c: "+0.51%" },
  { s: "ETH/USD", p: "3,521", c: "+1.92%" },
];

function Ticker() {
  const row = [...TICKERS, ...TICKERS];
  return (
    <div className="border-y border-border bg-card/40 backdrop-blur overflow-hidden py-3">
      <div className="ticker flex gap-10 whitespace-nowrap font-mono text-sm">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-muted-foreground">{t.s}</span>
            <span className="font-semibold">{t.p}</span>
            <span className={t.c.startsWith("+") ? "text-bull" : "text-bear"}>{t.c}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Strategies", "Results", "Quotes", "About", "Pricing", "FAQ", "Contact"];
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground"><TrendingUp className="h-4 w-4" /></span>
          Irfan's Trading Academy<span className="text-primary">.</span>
        </a>
        <div className="hidden gap-8 text-sm md:flex">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-muted-foreground transition hover:text-foreground">{l}</a>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href="https://www.youtube.com/@IrfanTrading_Academy" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 text-foreground transition hover:border-primary hover:bg-card">
            <YouTubeIcon className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/irfann.ta" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 text-foreground transition hover:border-primary hover:bg-card">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a href={WA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-105">
            <MessageCircle className="h-4 w-4" /> Start
          </a>
        </div>
        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="md:hidden grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/60">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <a href="https://www.youtube.com/@IrfanTrading_Academy" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition hover:border-primary">
                <YouTubeIcon className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/irfann.ta" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition hover:border-primary">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
            <a href={WA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground w-fit">
              <MessageCircle className="h-4 w-4" /> Start on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  return (
    <section id="top" ref={ref} className="relative grid-bg overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </motion.div>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 md:gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
            <span className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</span>
            <span className="text-primary font-semibold">Built for future 5 star traders</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Trade like the<br />
            <span className="text-gradient">institutions do.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground">
            Master 15+ proven day trading strategies. Fibonacci, ICT, Smart Money, Harmonic Patterns and more. Live mentorship from a top rated, reliable trader.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap gap-3">
            <a href={WA} target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-bull transition hover:scale-[1.03]">
              <span className="pulse-ring absolute inset-0 rounded-full" />
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:border-primary hover:bg-card">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { n: "15+", l: "Strategies taught" },
              { n: "95.97%", l: "Margin buffer" },
              { n: "Daily", l: "Live sessions" },
            ].map(s => (
              <div key={s.l}>
                <div className="font-mono text-2xl font-bold text-gradient">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-border bg-card/80 px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-bear/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-bull/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">GBPUSD · H4 · LIVE</span>
            </div>
            <img src={trading1.url} alt="GBPUSD chart with Fibonacci retracement levels" width={1200} height={800} fetchPriority="high" decoding="async" className="w-full" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
            className="absolute -bottom-6 -left-6 hidden rounded-xl border border-primary/40 bg-card/95 p-4 shadow-bull backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-bull/20 text-bull"><TrendingUp className="h-5 w-5" /></div>
              <div>
                <div className="font-mono text-sm font-bold text-bull">+$2,250.00</div>
                <div className="text-xs text-muted-foreground">NASDAQ:MSFT · closed</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >{children}</motion.div>
  );
}

function Strategies() {
  return (
    <section id="strategies" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Curriculum</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">15 strategies, <span className="text-gradient">one playbook.</span></h2>
            <p className="mt-4 text-muted-foreground">From classic price action to institutional order flow. Every strategy is taught with live charts and real trade examples.</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40">
            <img src={trading2.url} alt="Grid of 15 trading strategies: Fibonacci, Candlestick, Gann, Elliott Wave, FVG, Breakout, Renko, Momentum, Support & Resistance, Heikin Ashi, Divergence, Dynamic S&R, CHoCH, Harmonic, Moon Cycles" className="w-full" />
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { i: Target, t: "Precision Entries", d: "Use Fibonacci, FVGs and CHoCH to time entries with surgical accuracy." },
            { i: ShieldCheck, t: "Risk First", d: "Position sizing, stop loss placement and a margin buffer above 90%." },
            { i: Zap, t: "Live Sessions", d: "Daily London & NY sessions. Trade live alongside the mentor." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.1}>
              <div className="group rounded-2xl border border-border bg-card/60 p-6 transition hover:border-primary/50 hover:bg-card">
                <f.i className="h-8 w-8 text-primary transition group-hover:scale-110" />
                <h3 className="mt-4 font-display text-xl font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="relative border-y border-border bg-card/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">// Track record</span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Real trades. <span className="text-gradient">Real receipts.</span></h2>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-sm">
              <span className="text-muted-foreground">Account balance · </span>
              <span className="font-bold text-bull">$103,852.82</span>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[balance2, balance1].map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl transition hover:border-primary/50 hover:shadow-glow">
                <img src={img.url} alt={`Verified balance history ${i + 1}`} className="w-full" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            { i: Trophy, n: "15+", l: "Proven strategies" },
            { i: Target, n: "Risk first", l: "Position sizing" },
            { i: BarChart3, n: "Live", l: "Chart breakdowns" },
            { i: Clock, n: "24/7", l: "Direct access" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <s.i className="h-6 w-6 text-primary" />
                <div className="mt-3 font-mono text-3xl font-bold text-gradient">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  { n: "Starter", p: "$49", per: "/mo", f: ["Strategy library access", "Weekly market recap", "Community chat"] },
  { n: "Pro Trader", p: "$149", per: "/mo", featured: true, f: ["Everything in Starter", "Daily live sessions", "1 on 1 trade reviews", "Private signals channel"] },
  { n: "Elite Mentorship", p: "$499", per: "/mo", f: ["Everything in Pro", "Direct WhatsApp line", "Custom strategy build", "Funded account prep"] },
];

function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-10 bg-primary" /> About the Owner
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-6xl font-black leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
            <span className="text-gradient">Irfan</span>
            <br />
            <span className="text-foreground/90">Chulaqov</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
            <div className="space-y-4 border-l-2 border-primary/40 pl-6">
              <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">No hype.</div>
              <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">No fake signals.</div>
              <div className="font-mono text-sm uppercase tracking-widest text-primary">Just the truth.</div>
            </div>
            <p className="font-body text-xl leading-relaxed text-foreground/80 md:text-2xl">
              I am Irfan Chulaqov, a young day trader who built this academy on one simple rule. Tell the truth.
              I do not sell dreams, I do not push useless signals, and I do not pretend every week is green.
              Most mentors hide losses behind one lucky screenshot and call it a strategy. I show real entries,
              real exits, and the thinking behind both. My job is to teach you how markets actually move, how
              risk really works, and how to stay disciplined when real money is on the line. If you want honest
              mentorship instead of empty noise, you are finally in the right place.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Pricing</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Pick your <span className="text-gradient">edge.</span></h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.n} delay={i * 0.1}>
              <div className={`relative h-full rounded-2xl border p-6 transition md:p-8 ${plan.featured ? "border-primary bg-gradient-to-b from-primary/15 to-card shadow-glow scale-[1.02]" : "border-border bg-card/60 hover:border-primary/40"}`}>
                {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">MOST POPULAR</span>}
                <h3 className="font-display text-2xl font-semibold">{plan.n}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{plan.p}</span>
                  <span className="text-muted-foreground">{plan.per}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.f.map(f => (
                    <li key={f} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{f}</li>
                  ))}
                </ul>
                <a href={WA} target="_blank" rel="noreferrer" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:scale-[1.02] ${plan.featured ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:border-primary"}`}>
                  <MessageCircle className="h-4 w-4" /> Get started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const QUOTES = [
  { text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.", author: "Philip Fisher" },
  { text: "In this business, if you are good, you are right six times out of ten. You are never going to be right nine times out of ten.", author: "Peter Lynch" },
  { text: "Markets can stay irrational longer than you can stay solvent.", author: "John Maynard Keynes" },
  { text: "Risk comes from not knowing what you are doing.", author: "Warren Buffett" },
  { text: "The four most dangerous words in investing are: this time it is different.", author: "Sir John Templeton" },
  { text: "It is not necessary to do extraordinary things to get extraordinary results.", author: "Warren Buffett" },
];

function Quotes() {
  return (
    <section id="quotes" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Wisdom</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Words that <span className="text-gradient">shape winners.</span></h2>
            <p className="mt-4 text-muted-foreground">Timeless lessons from the greatest minds in markets.</p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card/60 p-7 transition hover:border-primary/40">
                <Quote className="h-6 w-6 text-primary/30" />
                <p className="mt-4 text-lg font-medium leading-relaxed text-foreground/90">{q.text}</p>
                <div className="mt-6 text-sm font-semibold text-primary">{q.author}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = FAQ_ITEMS;

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="border-y border-border bg-card/30 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Questions</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Everything you need <span className="text-gradient">to know.</span></h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card/60 overflow-hidden transition hover:border-primary/30">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-sm font-semibold md:text-base">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
const MINDSET = [
  { t: "Patience over urgency", d: "The market rewards traders who wait for their setup. We train you to sit on your hands until the chart actually confirms." },
  { t: "Process over outcome", d: "One green trade proves nothing. A repeatable process: entry, stop, target, journal. That is what builds a future 5 star trader." },
  { t: "Discipline over emotion", d: "Fear and greed blow accounts. We drill the mental rules that keep you executing your plan when real money is on the line." },
];

function Mindset() {
  return (
    <section className="border-y border-border bg-card/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Mindset</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Built for the <span className="text-gradient">future 5 star trader.</span></h2>
            <p className="mt-4 text-muted-foreground">Strategies are only half the game. The other half is the psychology behind every click.</p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {MINDSET.map((m, i) => (
            <Reveal key={m.t} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-background p-6 transition hover:border-primary/40">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
                <h3 className="mt-4 font-display text-xl font-semibold">{m.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-accent/10 p-6 md:p-10 lg:p-16">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative text-center">
              <LineChart className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 font-display text-4xl font-bold md:text-6xl">Ready to <span className="text-gradient">take the trade?</span></h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Message us on WhatsApp or call directly. We reply within minutes. Reliability is our edge.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={WA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-bull transition hover:scale-105">
                  <MessageCircle className="h-5 w-5" /> WhatsApp
                </a>
                <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-4 font-semibold transition hover:border-primary">
                  <Phone className="h-5 w-5" /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20, pointerEvents: show ? "auto" : "none" }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
    >
      <a href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="group relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-bull transition hover:scale-110">
        <span className="pulse-ring absolute inset-0 rounded-full" />
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href={`tel:${PHONE_RAW}`} aria-label="Call" className="grid h-14 w-14 place-items-center rounded-full border border-border bg-card text-foreground transition hover:scale-110 hover:border-primary">
        <Phone className="h-5 w-5" />
      </a>
      <a href="https://www.youtube.com/@IrfanTrading_Academy" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-14 w-14 place-items-center rounded-full border border-border bg-card text-foreground transition hover:scale-110 hover:border-primary">
        <YouTubeIcon className="h-5 w-5" />
      </a>
      <a href="https://www.instagram.com/irfann.ta" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-14 w-14 place-items-center rounded-full border border-border bg-card text-foreground transition hover:scale-110 hover:border-primary">
        <InstagramIcon className="h-5 w-5" />
      </a>
    </motion.div>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a2.986 2.986 0 0 0-2.1-2.115C19.506 3.5 12 3.5 12 3.5s-7.506 0-9.398.571a2.986 2.986 0 0 0-2.1 2.115C0 8.078 0 12 0 12s0 3.922.502 5.814a2.986 2.986 0 0 0 2.1 2.115C4.494 20.5 12 20.5 12 20.5s7.506 0 9.398-.571a2.986 2.986 0 0 0 2.1-2.115C24 15.922 24 12 24 12s0-3.922-.502-5.814zM9.545 15.5V8.5l6.273 3.5-6.273 3.5z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function Footer({ onOpenLegal }: { onOpenLegal: () => void }) {
  return (
    <footer className="border-t border-border bg-card/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Irfan's Trading Academy. All rights reserved.</div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href={`tel:${PHONE_RAW}`} className="hover:text-foreground">{PHONE}</a>
          <a href={WA} target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a>
          <a href="https://www.youtube.com/@IrfanTrading_Academy" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition hover:border-primary hover:text-foreground">
            <YouTubeIcon className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/irfann.ta" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition hover:border-primary hover:text-foreground">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <button
            onClick={onOpenLegal}
            className="underline underline-offset-2 hover:text-foreground"
          >
            Privacy Policy &amp; Terms
          </button>
        </div>
      </div>
      <div className="mx-auto mt-3 max-w-7xl px-6 text-center text-[10px] leading-tight text-muted-foreground/80">
        Educational content only. Not financial advice. Trading involves substantial risk of loss.
      </div>
    </footer>
  );
}

function Home() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalMounted, setLegalMounted] = useState(false);

  // Auto-open Privacy & Terms on first visit; defer mount so it doesn't block first paint.
  useEffect(() => {
    const t = setTimeout(async () => {
      const { hasLegalAck } = await import("@/components/LegalCompliance");
      setLegalMounted(true);
      if (!hasLegalAck()) setLegalOpen(true);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Ticker />
      <Strategies />
      <Results />
      <Quotes />
      <About />
      <Pricing />
      <FAQ />
      <Mindset />
      <CTA />
      <Footer onOpenLegal={() => { setLegalMounted(true); setLegalOpen(true); }} />
      <FloatingActions />
      {legalMounted && (
        <Suspense fallback={null}>
          <LegalCompliance open={legalOpen} onClose={() => setLegalOpen(false)} showBanner={false} />
        </Suspense>
      )}
    </main>
  );

}




