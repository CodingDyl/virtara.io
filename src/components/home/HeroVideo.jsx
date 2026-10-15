import { useCallback, useEffect, useRef, useState } from "react";
import { IconPlayerPlayFilled, IconReload, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

/**
 * Home's product frame: a 30s retro film on what a website does for a business.
 * Plays once, muted, the first time it scrolls into view. Sound is opt-in: a
 * click on the film unmutes it. When it ends (or is paused) a scrim with a play
 * button takes over, and the film never loops on its own.
 *
 * Two cuts: 16:9 for wider screens, 9:16 below `md`.
 */

const VIDEO = {
  desktop: {
    src: "/videos/digital-presence-desktop.mp4",
    poster: "/videos/digital-presence-desktop-poster.jpg",
    width: 1920,
    height: 1080,
  },
  mobile: {
    src: "/videos/digital-presence-mobile.mp4",
    poster: "/videos/digital-presence-mobile-poster.jpg",
    width: 1080,
    height: 1920,
  },
};

const PORTRAIT_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const matches = (query) => typeof window !== "undefined" && window.matchMedia(query).matches;

const usePortraitCut = () => {
  const [portrait, setPortrait] = useState(() => matches(PORTRAIT_QUERY));
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const onChange = (e) => setPortrait(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return portrait;
};

const HeroVideo = () => {
  const portrait = usePortraitCut();
  const cut = portrait ? VIDEO.mobile : VIDEO.desktop;

  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const autoplayedRef = useRef(false);
  // idle (never started) | playing | paused | ended
  const [status, setStatus] = useState("idle");
  const [muted, setMuted] = useState(true);

  // Autoplay once, muted, when the film is half in view. Skipped for users who
  // prefer reduced motion — they get the poster and a play button instead.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || matches(REDUCED_MOTION_QUERY) || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || autoplayedRef.current) return;
        autoplayedRef.current = true;
        observer.disconnect();
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        // Browsers may still refuse; the idle overlay stays up in that case.
        video.play().catch(() => {});
      },
      { threshold: 0.5 }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  // Swapping cuts (rotation, resize across md) remounts the <video>.
  useEffect(() => {
    setStatus("idle");
    setMuted(true);
  }, [portrait]);

  const playWithSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    autoplayedRef.current = true;
    if (status === "ended") video.currentTime = 0;
    video.muted = false;
    setMuted(false);
    video.play().catch(() => {});
  }, [status]);

  const onSurfaceClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      setMuted(false);
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const showOverlay = status !== "playing";
  const overlayLabel = status === "ended" ? "Watch again" : status === "paused" ? "Resume" : "Play with sound";

  return (
    <div className="shell">
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -top-16 h-40 bg-atmosphere blur-2xl" />

        <div
          ref={frameRef}
          className={cn(
            "relative mx-auto overflow-hidden rounded-card border border-edge bg-charcoal shadow-frame",
            portrait ? "w-full max-w-[min(100%,calc(80svh*9/16))]" : "w-full"
          )}
          style={{ aspectRatio: `${cut.width} / ${cut.height}` }}
        >
          <video
            key={cut.src}
            ref={videoRef}
            src={cut.src}
            poster={cut.poster}
            width={cut.width}
            height={cut.height}
            muted
            playsInline
            preload="metadata"
            aria-label="Retro animated film: how a good website helps a local business get found, trusted and open for customers"
            className="absolute inset-0 h-full w-full bg-ink object-cover"
            onPlay={() => setStatus("playing")}
            onPause={(e) => {
              if (!e.currentTarget.ended) setStatus("paused");
            }}
            onEnded={() => setStatus("ended")}
          />

          {/* While playing, the whole film is one button: first click turns sound on, later clicks pause. */}
          {status === "playing" && (
            <button
              type="button"
              onClick={onSurfaceClick}
              aria-label={muted ? "Turn sound on" : "Pause video"}
              className="absolute inset-0 cursor-pointer focus-visible:outline-offset-[-4px]"
            />
          )}

          {status === "playing" && (
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Turn sound on" : "Mute"}
              aria-pressed={!muted}
              className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-pill border border-edge-strong bg-canvas/70 px-3 text-caption text-cloud backdrop-blur-sm transition-colors duration-fast hover:bg-canvas/90 sm:bottom-4 sm:right-4"
            >
              {muted ? (
                <IconVolumeOff size={16} stroke={1.8} aria-hidden="true" />
              ) : (
                <IconVolume size={16} stroke={1.8} aria-hidden="true" />
              )}
              {muted ? "Tap for sound" : "Sound on"}
            </button>
          )}

          {showOverlay && (
            <div className="absolute inset-0 flex animate-fade-in items-center justify-center bg-canvas/60">
              <button
                type="button"
                onClick={playWithSound}
                className="group flex flex-col items-center gap-3 rounded-card p-4 text-cloud"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-cloud/90 text-charcoal shadow-raised transition-colors duration-fast group-hover:bg-cloud sm:h-[72px] sm:w-[72px]">
                  {status === "ended" ? (
                    <IconReload size={26} stroke={1.8} aria-hidden="true" />
                  ) : (
                    <IconPlayerPlayFilled size={26} aria-hidden="true" className="translate-x-px" />
                  )}
                </span>
                <span className="text-nav font-medium">{overlayLabel}</span>
                <span className="sr-only">(30 second video)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;
