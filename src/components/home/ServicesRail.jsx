import { useState } from "react";
import {
  IconBrowser,
  IconSearch,
  IconChartArrowsVertical,
  IconShieldCheck,
  IconCheck,
  IconArrowUpRight,
  IconArrowDownRight,
  IconMinus,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { clarity } from "../../assets";
import { cn } from "../../utils/cn";

/**
 * Four services, each shown as the thing it produces. Example panes are
 * labelled as examples — they illustrate the deliverable, they are not client
 * data.
 */

const ExampleTag = () => (
  <span className="rounded-pill border border-edge bg-ink px-2 py-0.5 text-[11px] font-medium text-quiet">Example report</span>
);

const PaneHeader = ({ title, example }) => (
  <div className="flex items-center justify-between gap-3 border-b border-edge px-4 py-3">
    <span className="text-[13px] font-medium text-frost">{title}</span>
    {example && <ExampleTag />}
  </div>
);

const WebPane = () => (
  <div className="overflow-hidden rounded-card border border-edge bg-ink">
    <div className="flex items-center gap-1.5 border-b border-edge px-3 py-2.5" aria-hidden="true">
      <span className="h-2 w-2 rounded-full bg-edge-strong" />
      <span className="h-2 w-2 rounded-full bg-edge-strong" />
      <span className="h-2 w-2 rounded-full bg-edge-strong" />
      <span className="ml-2 rounded-[6px] border border-edge bg-canvas px-2.5 py-0.5 text-[11px] text-quiet">clarityce.co.za</span>
    </div>
    <img src={clarity} alt="Clarity Engineering website, built by Virtara" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
  </div>
);

const seoRows = [
  { term: "commercial electrician johannesburg", pos: 3, move: 6 },
  { term: "electrical compliance certificate", pos: 5, move: 4 },
  { term: "load shedding backup installers", pos: 8, move: 11 },
  { term: "solar installation sandton", pos: 12, move: 0 },
  { term: "industrial electrical contractors", pos: 14, move: -2 },
];

const Move = ({ n }) =>
  n > 0 ? (
    <span className="inline-flex items-center gap-0.5 text-positive"><IconArrowUpRight size={13} stroke={2} aria-hidden="true" />{n}</span>
  ) : n < 0 ? (
    <span className="inline-flex items-center gap-0.5 text-critical"><IconArrowDownRight size={13} stroke={2} aria-hidden="true" />{Math.abs(n)}</span>
  ) : (
    <span className="inline-flex items-center text-quiet"><IconMinus size={13} stroke={2} aria-label="no change" /></span>
  );

const SeoPane = () => (
  <div className="overflow-hidden rounded-card border border-edge bg-ink">
    <PaneHeader title="Monthly ranking report" example />
    <table className="w-full text-[13px]">
      <thead>
        <tr className="text-left text-[12px] text-quiet">
          <th className="px-4 py-2.5 font-medium">Keyword</th>
          <th className="px-2 py-2.5 text-right font-medium">Position</th>
          <th className="px-4 py-2.5 text-right font-medium">30 days</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-edge">
        {seoRows.map((r) => (
          <tr key={r.term}>
            <td className="max-w-0 truncate px-4 py-3 text-frost">{r.term}</td>
            <td className="figure px-2 py-3 text-right text-cloud">{r.pos}</td>
            <td className="figure px-4 py-3 text-right"><Move n={r.move} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const adRows = [
  { name: "Search · High intent", channel: "Google", leads: 46, cpl: "R212" },
  { name: "Remarketing · 30 day", channel: "Meta", leads: 31, cpl: "R148" },
  { name: "Prospecting · Lookalike", channel: "Meta", leads: 22, cpl: "R305" },
  { name: "Brand · Defence", channel: "Google", leads: 18, cpl: "R96" },
];

const GrowthPane = () => (
  <div className="overflow-hidden rounded-card border border-edge bg-ink">
    <PaneHeader title="Campaigns this month" example />
    <ul className="divide-y divide-edge text-[13px]">
      {adRows.map((r) => (
        <li key={r.name} className="flex items-center gap-3 px-4 py-3">
          <span className="w-14 shrink-0 rounded-pill border border-edge bg-canvas px-2 py-0.5 text-center text-[11px] text-mist">{r.channel}</span>
          <span className="min-w-0 flex-1 truncate text-frost">{r.name}</span>
          <span className="figure w-10 text-right text-cloud">{r.leads}</span>
          <span className="figure w-14 text-right text-mist">{r.cpl}</span>
        </li>
      ))}
    </ul>
    <div className="flex justify-end gap-3 border-t border-edge px-4 py-2 text-[11px] text-quiet">
      <span className="w-10 text-right">Leads</span>
      <span className="w-14 text-right">Cost / lead</span>
    </div>
  </div>
);

const careLog = [
  { what: "WordPress core + 14 plugins updated", when: "Today, 06:10" },
  { what: "Off-site backup verified", when: "Today, 03:00" },
  { what: "Malware scan · no issues", when: "Yesterday" },
  { what: "Image weight cut 38% on /services", when: "Mon" },
  { what: "Contact form test submission passed", when: "Mon" },
];

const CarePane = () => (
  <div className="overflow-hidden rounded-card border border-edge bg-ink">
    <PaneHeader title="Site care log" example />
    <ul className="divide-y divide-edge text-[13px]">
      {careLog.map((r) => (
        <li key={r.what} className="flex items-center gap-3 px-4 py-3">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
            <IconCheck size={12} stroke={2.4} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1 truncate text-frost">{r.what}</span>
          <span className="shrink-0 text-[12px] text-quiet">{r.when}</span>
        </li>
      ))}
    </ul>
  </div>
);

const services = [
  {
    id: "web",
    icon: IconBrowser,
    title: "Web design & development",
    desc: "Conversion-first sites and commerce builds, scoped once, shipped fast.",
    price: "From R12,500 once-off",
    points: ["5–15 page builds with conversion-focused structure", "CMS, blog, booking and CRM integrations", "Average Lighthouse performance of 97+"],
    to: "/services#development",
    Pane: WebPane,
  },
  {
    id: "seo",
    icon: IconSearch,
    title: "SEO & content",
    desc: "Month-to-month retainers that compound. No lock-in contracts.",
    price: "From R4,500 / month",
    points: ["Technical baseline and indexing fixes", "Google Business Profile optimisation", "Monthly ranking and lead report"],
    to: "/services#seo",
    Pane: SeoPane,
  },
  {
    id: "growth",
    icon: IconChartArrowsVertical,
    title: "Paid media & growth",
    desc: "Google and Meta campaigns run against a cost-per-lead target.",
    price: "From R6,500 / month management",
    points: ["Conversion tracking and dashboards", "Weekly optimisation and budget pacing", "Lead-quality scoring loop"],
    to: "/services#growth",
    Pane: GrowthPane,
  },
  {
    id: "care",
    icon: IconShieldCheck,
    title: "Maintenance & support",
    desc: "Updates, backups, security and fixes — handled before you notice.",
    price: "From R1,000 / month",
    points: ["Monthly CMS and plugin updates", "Weekly secure backups and uptime monitoring", "Priority support on Pro and Premium plans"],
    to: "/maintenance-support",
    Pane: CarePane,
  },
];

const ServicesRail = () => {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((s) => s.id === activeId);
  const { Pane } = active;

  return (
    <div className="grid overflow-hidden rounded-card border border-edge bg-[rgba(11,12,17,0.8)] shadow-inset lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="border-b border-edge p-2 lg:border-b-0 lg:border-r">
        <ul className="space-y-1">
          {services.map((s) => {
            const on = s.id === activeId;
            const Icon = s.icon;
            return (
              <li key={s.id} className={cn("rounded-control transition-colors duration-fast", on && "bg-white/[0.04]")}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveId(s.id)}
                  className={cn(
                    "flex w-full items-start gap-3.5 rounded-control p-4 text-left transition-colors duration-fast",
                    !on && "hover:bg-white/[0.02]"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-fast",
                      on ? "border-signal/40 bg-signal/10 text-cloud" : "border-edge bg-steel text-mist"
                    )}
                  >
                    <Icon size={18} stroke={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block text-feature", on ? "text-cloud" : "text-frost")}>{s.title}</span>
                    <span className="mt-1 block text-nav font-normal text-mist">{s.desc}</span>
                  </span>
                </button>
                {on && (
                  <div className="animate-fade-in pb-4 pl-[68px] pr-4">
                    <ul className="space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-nav font-normal text-frost">
                          <IconCheck size={15} stroke={2} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <span className="figure text-[15px] text-cloud">{s.price}</span>
                      <Link
                        to={s.to}
                        className="inline-flex items-center gap-1 text-nav text-signal-soft transition-colors duration-fast hover:text-cloud"
                      >
                        See packages
                        <IconArrowUpRight size={14} stroke={2} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative flex items-center bg-lift p-4 sm:p-8 lg:p-10">
        <div key={active.id} className="w-full animate-rise">
          <Pane />
        </div>
      </div>
    </div>
  );
};

export default ServicesRail;
