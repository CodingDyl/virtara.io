import { useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import Button from "../ui/Button";

/**
 * Detail view for one project, opened from the sphere. Same facts as the grid
 * cards (KPI, before/after, stack, live link) on a charcoal sheet. Esc and the
 * backdrop close it; focus moves in on open and returns to the tile on close.
 */
const ProjectModal = ({ project, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const nodes = e.currentTarget.querySelectorAll("a[href], button");
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }}
        className="relative max-h-[calc(100svh-2rem)] w-full max-w-3xl animate-menu-in overflow-y-auto rounded-card border border-edge bg-charcoal shadow-float"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-control border border-edge bg-canvas/70 text-mist transition-colors duration-fast hover:border-edge-strong hover:text-cloud"
        >
          <IconX size={18} stroke={1.8} aria-hidden="true" />
        </button>

        {/* The live site in a browser frame */}
        <div className="border-b border-edge bg-ink p-4 pb-0 sm:p-6 sm:pb-0">
          <div className="overflow-hidden rounded-t-[10px] border border-b-0 border-edge bg-steel">
            <div className="flex items-center gap-2 border-b border-edge px-3 py-2">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-edge-strong" />
                <span className="h-2 w-2 rounded-full bg-edge-strong" />
                <span className="h-2 w-2 rounded-full bg-edge-strong" />
              </span>
              <span className="truncate rounded-[6px] bg-ink px-2 py-0.5 text-[11px] text-quiet">{project.domain}</span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} website, built by Virtara`}
                width="1280"
                height="800"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="project-modal-title" className="text-title text-cloud">
                {project.title}
              </h2>
              <p className="mt-0.5 text-caption text-quiet">{project.category}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="figure text-[32px] leading-none text-cloud">{project.kpi.value}</p>
              <p className="mt-1 text-caption text-mist">{project.kpi.label}</p>
            </div>
          </div>

          <p className="mt-4 text-body text-mist">{project.summary}</p>

          <dl className="mt-5 grid gap-4 border-t border-edge pt-5 text-nav font-normal sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2 font-medium text-frost">
                <span className="h-1.5 w-1.5 rounded-full bg-critical" aria-hidden="true" />
                Before
              </dt>
              <dd className="mt-1 leading-relaxed text-mist">{project.before}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-medium text-frost">
                <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
                After
              </dt>
              <dd className="mt-1 leading-relaxed text-mist">{project.after}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
              {project.stack.map((item) => (
                <li key={item} className="rounded-pill border border-edge bg-ink px-2.5 py-1 text-[12px] text-mist">
                  {item}
                </li>
              ))}
            </ul>
            <Button href={project.link} target="_blank" rel="noreferrer" size="md" showArrow>
              Visit {project.domain}
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
