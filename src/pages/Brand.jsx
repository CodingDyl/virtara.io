import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IconCheck, IconCopy, IconX, IconMail } from "@tabler/icons-react";
import PageShell from "../components/layout/PageShell";
import PageHero, { Announcement } from "../components/layout/PageHero";
import SectionHeading from "../components/layout/SectionHeading";
import Logo, { LogoMark } from "../components/brand/Logo";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import { capetown, karoo, joburg, drakensberg } from "../assets";
import {
  surfaces,
  text,
  signal,
  status,
  typeScale,
  radii,
  shadows,
  fonts,
  motion,
  layout,
  spacing,
} from "../design/tokens";
import { cn } from "../utils/cn";

/**
 * The Virtara brand book. Every value on this page is read from
 * src/design/tokens.js — the same file Tailwind builds the site from — so the
 * book is always the shipped truth.
 */

/* ---------- helpers ---------- */

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const CANVAS = surfaces[0].value;

const sections = [
  { id: "principles", label: "Principles" },
  { id: "logo", label: "Logo" },
  { id: "colour", label: "Colour" },
  { id: "typography", label: "Typography" },
  { id: "shape", label: "Shape & elevation" },
  { id: "components", label: "Components" },
  { id: "imagery", label: "Imagery" },
  { id: "voice", label: "Voice" },
  { id: "rules", label: "Do & don't" },
];

const Block = ({ id, title, lead, children }) => (
  <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-edge py-16 md:py-20">
    <SectionHeading id={`${id}-h`} title={title} lead={lead} />
    <div className="mt-10">{children}</div>
  </section>
);

const Swatch = ({ token, value, name, use, onLight = false }) => {
  const [copied, setCopied] = useState(false);
  const ratio = contrast(value, CANVAS);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — the value is visible anyway */
    }
  };
  return (
    <div className="overflow-hidden rounded-card border border-edge bg-ink">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${name} ${value}`}
        className="group relative block h-24 w-full border-b border-edge"
        style={{ background: value }}
      >
        <span
          className={cn(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-[8px] opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100",
            onLight ? "bg-charcoal/80 text-cloud" : "bg-white/10 text-cloud"
          )}
        >
          {copied ? <IconCheck size={14} stroke={2} /> : <IconCopy size={14} stroke={1.8} />}
        </span>
      </button>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-nav font-semibold text-cloud">{name}</span>
          <span className="figure text-[13px] uppercase text-mist">{value}</span>
        </div>
        <p className="mt-1 font-mono text-[12px] text-quiet">{token}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-mist">{use}</p>
        <p className="mt-3 text-[12px] text-quiet">
          <span className="figure text-frost">{ratio.toFixed(1)}:1</span> on canvas
          {ratio >= 7 ? " · AAA" : ratio >= 4.5 ? " · AA" : ratio >= 3 ? " · large text only" : " · decorative only"}
        </p>
      </div>
    </div>
  );
};

const Rule = ({ ok, children }) => (
  <li className="flex items-start gap-3 py-3 text-body text-frost">
    <span
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        ok ? "bg-positive/15 text-positive" : "bg-critical/15 text-critical"
      )}
    >
      {ok ? <IconCheck size={12} stroke={2.6} aria-label="Do" /> : <IconX size={12} stroke={2.6} aria-label="Don't" />}
    </span>
    <span>{children}</span>
  </li>
);

/* ---------- page ---------- */

function Brand() {
  return (
    <PageShell>
      <Helmet>
        <title>Brand Book | Virtara</title>
        <meta
          name="description"
          content="The Virtara brand book: logo, colour, typography, components, imagery and voice — rendered live from the tokens that build the site."
        />
        <link rel="canonical" href="https://virtara.co.za/brand" />
      </Helmet>

      <PageHero
        title="The Virtara brand book."
        lead="A quiet, near-black stage. One signal of electric blue. Real work in the frame. Every value on this page is read from the same tokens that build the site."
        actions={
          <>
            <Button href="#colour" size="lg" className="font-semibold">
              Jump to colour
            </Button>
            <Button href="/web_logo_bg.svg" download variant="secondary" size="lg">
              Download the mark
            </Button>
          </>
        }
      />

      <div className="shell pb-10 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Brand book" className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l border-edge">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-nav text-mist transition-colors duration-fast hover:border-signal hover:text-cloud">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          {/* Principles */}
          <Block id="principles" title="Principles" lead="What every page, post and pitch deck should feel like.">
            <div className="grid gap-px overflow-hidden rounded-card border border-edge bg-edge sm:grid-cols-2">
              {[
                ["A quiet stage", "Near-black canvas, white type, hairline structure. The page recedes so the work can lead."],
                ["One signal", "Electric blue from the infinity mark appears only where it means something: selection, focus, light."],
                ["Prove, don't claim", "Show the real site, the real number, the real before-and-after. Never a stock person at a monitor."],
                ["Speed is the brand", "An agency selling performance has to be fast. Every asset earns its bytes."],
              ].map(([t, d]) => (
                <div key={t} className="bg-ink p-6">
                  <h3 className="text-feature text-cloud">{t}</h3>
                  <p className="mt-2 text-body text-mist">{d}</p>
                </div>
              ))}
            </div>
          </Block>

          {/* Logo */}
          <Block id="logo" title="Logo" lead="The infinity mark with the Virtara wordmark. The mark carries all the colour; the wordmark is always Cloud white.">
            <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <div className="relative flex min-h-[260px] items-center justify-center rounded-card border border-edge bg-canvas">
                {/* Clear space = the height of the mark on every side */}
                <div className="relative border border-dashed border-signal/40 p-10">
                  <Logo size="lg" />
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-full pb-1 text-[11px] text-quiet">1× mark</span>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="flex items-center justify-center gap-6 rounded-card border border-edge bg-ink">
                  <LogoMark className="h-12 w-12" />
                  <LogoMark className="h-8 w-8" />
                  <LogoMark className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-center rounded-card bg-white">
                  <span className="inline-flex items-center gap-2">
                    <LogoMark className="h-6 w-6" />
                    <span className="text-[17px] font-semibold tracking-[-0.02em] text-charcoal">Virtara</span>
                  </span>
                </div>
              </div>
            </div>
            <ul className="mt-6 grid gap-x-10 divide-y divide-edge border-y border-edge md:grid-cols-2 md:divide-y-0">
              <Rule ok>Keep clear space equal to the mark's height on every side.</Rule>
              <Rule ok>Minimum mark size: 20px on screen.</Rule>
              <Rule>Recolour, outline or add effects to the mark.</Rule>
              <Rule>Place the lockup on busy imagery without a dark scrim.</Rule>
            </ul>
          </Block>

          {/* Colour */}
          <Block
            id="colour"
            title="Colour"
            lead="Five surface layers build every page. Text steps down in four levels. Signal Blue is rare on purpose. Click a swatch to copy its value."
          >
            {/* The layer stack */}
            <div className="mb-10 rounded-card border border-edge bg-canvas p-6 sm:p-10">
              <div className="rounded-card border border-edge bg-ink p-5 sm:p-8">
                <div className="rounded-card border border-edge bg-charcoal p-5 sm:p-8">
                  <div className="rounded-control border border-edge bg-steel p-4">
                    <p className="text-nav text-frost">
                      Canvas → Ink → Charcoal → Steel, separated by <span className="text-cloud">1px Edge</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-feature text-cloud">Surfaces</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {surfaces.map((c) => <Swatch key={c.token} {...c} />)}
            </div>

            <h3 className="mt-12 text-feature text-cloud">Text</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {text.map((c) => <Swatch key={c.token} {...c} onLight />)}
            </div>

            <h3 className="mt-12 text-feature text-cloud">Signal</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {signal.map((c) => <Swatch key={c.token} {...c} />)}
            </div>

            <h3 className="mt-12 text-feature text-cloud">Status</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {status.map((c) => <Swatch key={c.token} {...c} />)}
            </div>
          </Block>

          {/* Typography */}
          <Block
            id="typography"
            title="Typography"
            lead="Inter does all the talking, at medium weight — headings are composed, not shouted. Chakra Petch is the signature: numbers, prices and KPIs only."
          >
            <div className="divide-y divide-edge rounded-card border border-edge bg-ink">
              {[...typeScale].reverse().map((t) => (
                <div key={t.token} className="grid gap-3 p-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-baseline md:gap-8">
                  <div className="text-[12px] text-quiet">
                    <p className="text-nav text-frost">{t.name}</p>
                    <p className="mt-1 font-mono">text-{t.token}</p>
                    <p className="mt-0.5">
                      {t.px}px · {t.weight} · {t.lineHeight}
                    </p>
                  </div>
                  <p className={cn(`text-${t.token}`, "truncate text-cloud")}>Digital assets that outperform</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-card border border-edge bg-ink p-6">
                <p className="text-[12px] text-quiet">Primary · {fonts.sans[0]} 400 / 500 / 600</p>
                <p className="mt-4 text-[44px] font-medium leading-none tracking-[-0.03em] text-cloud">Aa Bb Rr</p>
                <p className="mt-4 text-body text-mist">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</p>
              </div>
              <div className="rounded-card border border-edge bg-ink p-6">
                <p className="text-[12px] text-quiet">Signature · Chakra Petch 500 — figures only</p>
                <p className="figure mt-4 text-[44px] leading-none text-cloud">+41% R12,500</p>
                <p className="figure mt-4 text-body text-mist">0123456789 · 2.1× · 97+</p>
              </div>
            </div>
          </Block>

          {/* Shape */}
          <Block id="shape" title="Shape & elevation" lead={`Four radii, four shadows, an 8px grid and a ${layout.shell} page width.`}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {radii.map((r) => (
                <div key={r.token} className="rounded-card border border-edge bg-ink p-5">
                  <div className="h-16 w-full border border-edge-strong bg-steel" style={{ borderRadius: r.value }} />
                  <p className="mt-4 text-nav font-semibold text-cloud">
                    {r.name} <span className="figure font-normal text-mist">{r.value === "9999px" ? "full" : r.value}</span>
                  </p>
                  <p className="mt-1 text-[13px] text-mist">{r.use}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-6 rounded-card border border-edge bg-canvas p-8 sm:grid-cols-2 xl:grid-cols-4">
              {shadows.map((s) => (
                <div key={s.token} className="text-center">
                  <div className="mx-auto h-20 rounded-card bg-charcoal" style={{ boxShadow: s.value }} />
                  <p className="mt-4 text-nav text-frost">{s.name}</p>
                  <p className="font-mono text-[12px] text-quiet">shadow-{s.token}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-3 rounded-card border border-edge bg-ink p-5">
              {spacing.map((n) => (
                <div key={n} className="text-center">
                  <div className="rounded-[4px] bg-signal/30" style={{ width: n / 2, height: n / 2 }} />
                  <p className="figure mt-2 text-[11px] text-quiet">{n}</p>
                </div>
              ))}
              <p className="ml-auto text-[13px] text-quiet">
                Motion: {motion.base} · <span className="font-mono">{motion.ease}</span>
              </p>
            </div>
          </Block>

          {/* Components */}
          <Block id="components" title="Components" lead="Filled actions are near-white, never blue. Secondary actions are a hairline. Everything is 12px round; cards are 16.">
            <div className="space-y-4">
              <Card className="p-6">
                <p className="text-[12px] text-quiet">Buttons</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button className="font-semibold">Book an audit</Button>
                  <Button variant="secondary">Start a project</Button>
                  <Button variant="quiet">Quiet</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button showArrow>With arrow</Button>
                  <Button loading>Sending</Button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-[12px] text-quiet">Badges & pills</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="signal">Live</Badge>
                    <Badge variant="positive">Shipped</Badge>
                    <Badge variant="caution">Pending</Badge>
                    <Badge variant="critical">Blocked</Badge>
                  </div>
                  <div className="mt-5">
                    <Announcement to="/brand">Announcement pill</Announcement>
                  </div>
                </Card>
                <Card className="p-6">
                  <p className="text-[12px] text-quiet">Form field</p>
                  <label htmlFor="bb-email" className="field-label mt-4">
                    Work email
                  </label>
                  <div className="relative">
                    <IconMail size={16} stroke={1.6} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-quiet" />
                    <input id="bb-email" type="email" placeholder="you@company.co.za" className="field-input pl-10" />
                  </div>
                  <p className="field-hint">We'll only use this to reply to you.</p>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6">
                  <p className="text-feature text-cloud">Card</p>
                  <p className="mt-1 text-nav font-normal text-mist">Ink + Edge hairline.</p>
                </Card>
                <Card variant="raised" className="p-6">
                  <p className="text-feature text-cloud">Raised</p>
                  <p className="mt-1 text-nav font-normal text-mist">Charcoal + Edge hairline.</p>
                </Card>
                <Card variant="float" className="p-6">
                  <p className="text-feature text-cloud">Float</p>
                  <p className="mt-1 text-nav font-normal text-mist">Charcoal + floating shadow. Menus only.</p>
                </Card>
              </div>
            </div>
          </Block>

          {/* Imagery */}
          <Block
            id="imagery"
            title="Imagery"
            lead="Two kinds of picture, nothing else. Real product frames — client sites in a browser — as evidence. South African places at blue hour as atmosphere."
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[capetown, karoo, joburg].map((src, i) => (
                <img key={src} src={src} alt={["Cape Town at night", "Karoo telescope array at night", "Johannesburg skyline at night"][i]} loading="lazy" className="aspect-[3/4] w-full rounded-card border border-edge object-cover" />
              ))}
              <img src={drakensberg} alt="Drakensberg at blue hour" loading="lazy" className="col-span-2 aspect-[3/4] w-full rounded-card border border-edge object-cover md:col-span-1" />
            </div>
            <ul className="mt-6 grid gap-x-10 divide-y divide-edge border-y border-edge md:grid-cols-2 md:divide-y-0">
              <Rule ok>Night or blue hour. Deep navy, cool blue light, a few warm windows.</Rule>
              <Rule ok>Dark scrim at the foot of any image that carries text.</Rule>
              <Rule>Stock people, handshakes, glowing holograms, or "person at a monitor".</Rule>
              <Rule>Saturated neon or a second accent colour.</Rule>
            </ul>
          </Block>

          {/* Voice */}
          <Block id="voice" title="Voice" lead="Quiet confidence. We sound like the senior person in the room who has done this before.">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <p className="flex items-center gap-2 text-[12px] text-positive">
                  <IconCheck size={14} stroke={2.4} aria-hidden="true" /> Sounds like Virtara
                </p>
                <p className="mt-3 text-title text-cloud">"Vaja's site now converts 30% more of its visitors."</p>
                <p className="mt-3 text-nav font-normal text-mist">Specific. Measured. Plain words. Sentence case.</p>
              </Card>
              <Card className="p-6">
                <p className="flex items-center gap-2 text-[12px] text-critical">
                  <IconX size={14} stroke={2.4} aria-hidden="true" /> Doesn't
                </p>
                <p className="mt-3 text-title text-mist">"Unleash Your Brand's Full Digital Potential! 🚀"</p>
                <p className="mt-3 text-nav font-normal text-mist">Hype, title case, emoji, a promise nobody can measure.</p>
              </Card>
            </div>
          </Block>

          {/* Rules */}
          <Block id="rules" title="Do & don't" lead="The short version, for anyone making anything with the Virtara name on it.">
            <div className="grid gap-x-10 md:grid-cols-2">
              <ul className="divide-y divide-edge border-y border-edge">
                <Rule ok>Use Void Canvas as the page; build depth with Ink, Charcoal and Steel.</Rule>
                <Rule ok>Set headings in Inter 500 with slight negative tracking.</Rule>
                <Rule ok>Make filled actions near-white with Charcoal text.</Rule>
                <Rule ok>Divide dark surfaces with a 1px Edge line.</Rule>
                <Rule ok>Keep Signal Blue to selection, focus, markers and light.</Rule>
              </ul>
              <ul className="divide-y divide-edge border-y border-edge">
                <Rule>Fill a button with blue, or use a gradient on text.</Rule>
                <Rule>Set headings in bold 700 or in Chakra Petch.</Rule>
                <Rule>Use radii under 12px on controls or over 16px on cards.</Rule>
                <Rule>Box client logos — keep them unboxed on the canvas.</Rule>
                <Rule>Use a light grey or white divider on dark.</Rule>
              </ul>
            </div>
          </Block>
        </div>
      </div>
    </PageShell>
  );
}

export default Brand;
