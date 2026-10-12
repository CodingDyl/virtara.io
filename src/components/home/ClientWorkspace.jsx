import { useRef, useState } from "react";
import { IconExternalLink, IconLock, IconLayoutDashboard } from "@tabler/icons-react";
import { projects } from "../../data/projects";
import { cn } from "../../utils/cn";

/**
 * Home's product frame. Featurebase rises a support console out of its hero;
 * Virtara's "product" is the work, so the frame is a client workspace: a rail
 * of real projects, the live site, and the engagement outcome.
 */

const Initial = ({ title, active }) => (
  <span
    aria-hidden="true"
    className={cn(
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border text-[12px] font-semibold",
      active ? "border-signal/40 bg-signal/15 text-cloud" : "border-edge bg-steel text-mist"
    )}
  >
    {title[0]}
  </span>
);

const ClientWorkspace = () => {
  const [activeId, setActiveId] = useState(projects[0].id);
  const tabRefs = useRef({});
  const project = projects.find((p) => p.id === activeId);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e, index) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = projects[(index + delta + projects.length) % projects.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div className="shell">
      {/* Category tabs above the frame */}
      <div
        role="tablist"
        aria-label="Client projects"
        className="-mx-4 mb-5 flex snap-x gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => {
          const active = p.id === activeId;
          return (
            <button
              key={p.id}
              ref={(el) => (tabRefs.current[p.id] = el)}
              role="tab"
              type="button"
              id={`ws-tab-${p.id}`}
              aria-selected={active}
              aria-controls="ws-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveId(p.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "flex shrink-0 snap-start items-center gap-2 rounded-control px-4 py-2.5 text-body font-medium transition-colors duration-fast",
                active ? "bg-white/[0.04] text-cloud" : "text-mist hover:text-frost"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rotate-45 rounded-[1px] transition-colors duration-fast",
                  active ? "bg-signal shadow-[0_0_8px_rgb(var(--v-signal))]" : "bg-edge-strong"
                )}
              />
              {p.title}
            </button>
          );
        })}
      </div>

      {/* The frame */}
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -top-16 h-40 bg-atmosphere blur-2xl" />
        <div
          id="ws-panel"
          role="tabpanel"
          aria-labelledby={`ws-tab-${activeId}`}
          className="relative overflow-hidden rounded-card border border-edge bg-charcoal shadow-frame"
        >
          <div className="grid lg:grid-cols-[208px_minmax(0,1fr)_288px]">
            {/* Rail */}
            <aside className="hidden border-r border-edge bg-ink/60 p-3 lg:block">
              <div className="flex items-center gap-2 px-2 pb-3 pt-1 text-caption text-quiet">
                <IconLayoutDashboard size={15} stroke={1.6} aria-hidden="true" />
                Client workspace
              </div>
              <ul className="space-y-0.5">
                {projects.map((p) => {
                  const active = p.id === activeId;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setActiveId(p.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 text-left transition-colors duration-fast",
                          active ? "bg-steel" : "hover:bg-white/[0.03]"
                        )}
                      >
                        <Initial title={p.title} active={active} />
                        <span className="min-w-0">
                          <span className={cn("block truncate text-[13px] font-medium", active ? "text-cloud" : "text-frost")}>
                            {p.title}
                          </span>
                          <span className="block truncate text-[12px] text-quiet">{p.category}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Live site */}
            <div className="min-w-0 border-edge lg:border-r">
              <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-edge-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-edge-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-edge-strong" />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[8px] border border-edge bg-ink px-3 py-1.5 text-[13px] text-mist">
                  <IconLock size={13} stroke={1.8} aria-hidden="true" className="shrink-0 text-quiet" />
                  <span className="truncate">{project.domain}</span>
                </div>
                <span className="hidden items-center gap-1.5 rounded-pill border border-positive/25 bg-positive/10 px-2 py-0.5 text-[12px] font-medium text-positive sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
                  Live
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <img
                  key={project.id}
                  src={project.image}
                  alt={`${project.title} website, built by Virtara`}
                  width="1280"
                  height="800"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full animate-fade-in object-cover object-top"
                />
              </div>
            </div>

            {/* Engagement details */}
            <div key={project.id} className="animate-fade-in p-5">
              <p className="text-caption text-quiet">Engagement outcome</p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="figure text-[44px] leading-none text-cloud">{project.kpi.value}</span>
              </p>
              <p className="mt-1 text-nav font-normal text-mist">{project.kpi.label}</p>

              <dl className="mt-6 divide-y divide-edge border-y border-edge text-[13px]">
                <div className="py-3">
                  <dt className="flex items-center gap-2 font-medium text-frost">
                    <span className="h-1.5 w-1.5 rounded-full bg-critical" aria-hidden="true" />
                    Before
                  </dt>
                  <dd className="mt-1 leading-relaxed text-mist">{project.before}</dd>
                </div>
                <div className="py-3">
                  <dt className="flex items-center gap-2 font-medium text-frost">
                    <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
                    After
                  </dt>
                  <dd className="mt-1 leading-relaxed text-mist">{project.after}</dd>
                </div>
              </dl>

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-pill border border-edge bg-ink px-2.5 py-1 text-[12px] text-mist">
                    {s}
                  </li>
                ))}
              </ul>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-9 w-full items-center justify-center gap-2 rounded-control border border-edge-strong text-nav font-medium text-cloud transition-colors duration-fast hover:bg-white/[0.04]"
              >
                Visit {project.domain}
                <IconExternalLink size={14} stroke={1.8} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWorkspace;
