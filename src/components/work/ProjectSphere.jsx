import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconHandMove } from "@tabler/icons-react";
import ProjectModal from "./ProjectModal";

/**
 * Interactive 3D sphere of client work for /our-work. Every project is a mini
 * browser tile placed on a Fibonacci sphere; drag (or swipe sideways) to spin,
 * click a tile for the full case study. It sizes itself to however many
 * projects exist, so adding to `data/projects.js` just fills it out.
 *
 * Positions are written straight to the DOM from a rAF loop (no React state at
 * 60fps). Tiles are real buttons: Tab focuses one and turns it to the front,
 * Enter opens it. Reduced-motion users get no auto-spin or momentum.
 */

const TAU = Math.PI * 2;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Unit-sphere points, evenly spread for any count (offset by half a step so
// small counts don't pin a tile to a pole).
const fibonacciPoints = (count) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
};

const smoothstep = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Shortest signed distance between two angles.
const angleDelta = (from, to) => ((((to - from) % TAU) + TAU + Math.PI) % TAU) - Math.PI;

const ProjectSphere = ({ projects }) => {
  const stageRef = useRef(null);
  const tileRefs = useRef([]);
  const points = useMemo(() => fibonacciPoints(projects.length), [projects.length]);

  // Mutable animation state — never triggers a render.
  const rot = useRef({ x: -0.22, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, moved: 0, lastX: 0, lastY: 0, pointerType: "mouse" });
  const hovering = useRef(false);
  const visible = useRef(false);
  const modalOpen = useRef(false);
  const focusTarget = useRef(null);
  const reduced = useRef(false);
  const size = useRef({ radius: 0, radiusX: 0 });

  const [layout, setLayout] = useState({ h: 560, tileW: 190 });
  const [active, setActive] = useState(null);

  // Measure the stage. Sphere diameter is driven by height; tile width by both.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    reduced.current = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    const measure = () => {
      const w = stage.clientWidth;
      const h = Math.round(Math.min(Math.max(w * 0.62, 460), 720));
      const density = Math.max(0.6, Math.min(1, Math.sqrt(8 / projects.length)));
      const tileW = Math.round(Math.min(Math.max(Math.min(w, h * 1.25) * 0.3, 148), 250) * density);
      // Depth and height share one radius; width may stretch so the sphere fills a wide stage.
      const radius = Math.max(60, h / 2 - tileW * 0.45);
      const radiusX = Math.max(60, Math.min(w / 2 - tileW * 0.62, radius * 1.6));
      size.current = { radius, radiusX };
      setLayout({ h, tileW });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [projects.length]);

  // Only animate while on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !("IntersectionObserver" in window)) {
      visible.current = true;
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), { threshold: 0 });
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    modalOpen.current = Boolean(active);
  }, [active]);

  // The frame loop.
  useEffect(() => {
    let raf;
    let last = performance.now();

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible.current) return;

      const r = rot.current;
      const v = vel.current;
      const d = drag.current;

      if (focusTarget.current) {
        // Ease toward the focused tile; user dragging cancels it.
        const t = focusTarget.current;
        const dy = angleDelta(r.y, t.y);
        const dx = t.x - r.x;
        r.y += dy * 0.14;
        r.x += dx * 0.14;
        v.x = v.y = 0;
        if (Math.abs(dy) < 0.002 && Math.abs(dx) < 0.002) focusTarget.current = null;
      } else if (!d.active) {
        if (!reduced.current) {
          r.y += v.y;
          r.x = Math.max(-1.1, Math.min(1.1, r.x + v.x));
          v.x *= 0.94;
          v.y *= 0.94;
        }
        const paused = hovering.current || modalOpen.current || reduced.current;
        if (!paused) r.y += 0.16 * dt;
      }
      r.y = ((r.y + Math.PI) % TAU + TAU) % TAU - Math.PI;

      const { radius, radiusX } = size.current;
      const cosY = Math.cos(r.y);
      const sinY = Math.sin(r.y);
      const cosX = Math.cos(r.x);
      const sinX = Math.sin(r.x);

      for (let i = 0; i < points.length; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;
        const p = points[i];
        // Rotate about Y, then X.
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX; // -1 (back) … 1 (front)

        const scale = 0.64 + 0.46 * ((z2 + 1) / 2);
        const opacity = 0.16 + 0.84 * smoothstep(-0.55, 0.3, z2);
        el.style.transform = `translate3d(${(x1 * radiusX).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round(1000 + z2 * 500));
        el.style.pointerEvents = z2 < 0 ? "none" : "auto";
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [points]);

  // Drag to spin. Window listeners (no pointer capture) so tile clicks still fire.
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const d = drag.current;
    d.active = true;
    d.moved = 0;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.pointerType = e.pointerType;
    vel.current = { x: 0, y: 0 };
    focusTarget.current = null;

    const onMove = (ev) => {
      if (!d.active) return;
      const dx = ev.clientX - d.lastX;
      const dy = ev.clientY - d.lastY;
      d.lastX = ev.clientX;
      d.lastY = ev.clientY;
      d.moved += Math.abs(dx) + Math.abs(dy);
      const ry = dx * 0.009;
      // Touch keeps vertical gestures for page scroll, so tilt is mouse/pen only.
      const rx = d.pointerType === "touch" ? 0 : -dy * 0.009;
      rot.current.y += ry;
      rot.current.x = Math.max(-1.1, Math.min(1.1, rot.current.x + rx));
      vel.current = { x: rx * 0.6, y: ry * 0.6 };
    };
    const end = () => {
      d.active = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  const openProject = (e, project) => {
    // A drag that happens to end over a tile is not a click. Keyboard clicks
    // (detail 0) never come from a drag.
    if (e.detail !== 0 && drag.current.moved > 6) return;
    setActive(project);
  };

  // Tab / focus: bring that tile to the front.
  const faceTile = (index) => {
    const p = points[index];
    const ry = Math.atan2(-p.x, p.z);
    // Face it head-on with the same slight downward tilt the sphere starts with.
    focusTarget.current = { y: ry, x: -0.12 };
  };

  const closeModal = useCallback(() => setActive(null), []);

  return (
    <>
      <div
        ref={stageRef}
        role="group"
        aria-label="Our projects. Drag to rotate, select a project for details."
        className="relative isolate w-full cursor-grab select-none overflow-hidden rounded-card border border-edge bg-ink/60 [touch-action:pan-y] active:cursor-grabbing"
        style={{ height: layout.h }}
        onPointerDown={onPointerDown}
        onPointerEnter={(e) => (hovering.current = e.pointerType === "mouse")}
        onPointerLeave={() => (hovering.current = false)}
      >
        {/* Light behind the sphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-atmosphere opacity-60 blur-3xl"
        />

        {projects.map((project, i) => (
          <button
            key={project.id}
            ref={(el) => (tileRefs.current[i] = el)}
            type="button"
            data-tile
            aria-label={`${project.title}, ${project.category}. ${project.kpi.value} ${project.kpi.label}. Open details`}
            onFocus={() => faceTile(i)}
            onClick={(e) => openProject(e, project)}
            className="group absolute left-1/2 top-1/2 block cursor-pointer text-left will-change-transform"
            style={{ width: layout.tileW }}
          >
            <span className="block overflow-hidden rounded-card border border-edge bg-charcoal shadow-float transition-colors duration-base ease-out group-hover:border-signal/50 group-focus-visible:border-signal/50">
              <span className="flex items-center gap-1.5 border-b border-edge bg-steel px-2.5 py-1.5" aria-hidden="true">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-edge-strong" />
                  <span className="h-1.5 w-1.5 rounded-full bg-edge-strong" />
                  <span className="h-1.5 w-1.5 rounded-full bg-edge-strong" />
                </span>
                <span className="truncate rounded-[4px] bg-ink px-1.5 py-px text-[10px] leading-none text-quiet">
                  {project.domain}
                </span>
              </span>
              <span className="relative block aspect-[16/10] overflow-hidden bg-ink">
                <img
                  src={project.image}
                  alt=""
                  width="1280"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </span>
              <span className="flex items-end justify-between gap-2 px-2.5 py-2">
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-semibold leading-tight text-cloud">{project.title}</span>
                  <span className="block truncate text-[10px] leading-tight text-quiet">{project.category}</span>
                </span>
                <span className="figure shrink-0 text-[15px] leading-none text-cloud">{project.kpi.value}</span>
              </span>
            </span>
          </button>
        ))}

        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-1/2 z-[2000] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-pill border border-edge bg-canvas/70 px-3 py-1.5 text-caption text-mist backdrop-blur-sm sm:bottom-4"
        >
          <IconHandMove size={15} stroke={1.7} />
          <span className="sm:hidden">Drag to explore</span>
          <span className="hidden sm:inline">Drag to explore · select a project</span>
        </p>
      </div>

      <ProjectModal project={active} onClose={closeModal} />
    </>
  );
};

export default ProjectSphere;
