import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronDown, IconX, IconMenu2, IconArrowUpRight } from "@tabler/icons-react";
import Logo from "./brand/Logo";
import Button from "./ui/Button";
import { menus, primaryLinks, cta, secondaryCta } from "./navigation/menus";
import { cn } from "../utils/cn";

/* ---------------------------------------------------------------------------
 * Mega-menu pieces
 * ------------------------------------------------------------------------ */

const MenuItem = ({ item, onNavigate }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="group flex items-start gap-3.5 rounded-control p-3 transition-colors duration-fast hover:bg-white/[0.035] focus-visible:bg-white/[0.035]"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-edge bg-steel text-frost transition-colors duration-fast group-hover:border-edge-strong group-hover:text-cloud">
        <Icon size={18} stroke={1.6} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-nav font-semibold text-cloud">{item.title}</span>
        <span className="mt-0.5 block text-nav font-normal text-quiet transition-colors duration-fast group-hover:text-mist">
          {item.desc}
        </span>
      </span>
    </Link>
  );
};

const SceneCard = ({ card, onNavigate }) => (
  <Link
    to={card.to}
    onClick={onNavigate}
    className="group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-card border border-edge bg-ink p-4"
  >
    <img
      src={card.image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width="640"
      height="853"
      className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
    />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,6,8,0)_35%,rgba(5,6,8,0.92)_88%)]" />
    <span className="flex items-center gap-1 text-nav font-semibold text-cloud">
      {card.title}
      <IconArrowUpRight size={14} stroke={2} aria-hidden="true" className="text-quiet transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cloud" />
    </span>
    <span className="mt-1 text-[13px] leading-[1.45] text-mist">{card.desc}</span>
  </Link>
);

const ScreenCard = ({ card, onNavigate }) => (
  <Link
    to={card.to}
    onClick={onNavigate}
    className="group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-card border border-edge bg-charcoal p-4"
  >
    {/* A miniature browser window holding a real screenshot. */}
    <div aria-hidden="true" className="absolute inset-x-4 top-4 -z-10 overflow-hidden rounded-[10px] border border-edge bg-steel shadow-float transition-transform duration-slow ease-out group-hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-edge px-2.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-edge-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-edge-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-edge-strong" />
        <span className="ml-1.5 h-2.5 flex-1 rounded-full bg-ink" />
      </div>
      <img src={card.image} alt="" loading="lazy" decoding="async" className="aspect-[16/11] w-full object-cover object-top" />
    </div>
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(15,18,25,0)_30%,rgba(15,18,25,0.96)_62%)]" />
    {card.label && (
      <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-pill border border-edge bg-ink px-2 py-0.5 text-[12px] font-medium text-mist">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        {card.label}
      </span>
    )}
    <span className="flex items-center gap-1 text-nav font-semibold text-cloud">
      {card.title}
      <IconArrowUpRight size={14} stroke={2} aria-hidden="true" className="text-quiet transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cloud" />
    </span>
    <span className="mt-1 text-[13px] leading-[1.45] text-mist">{card.desc}</span>
  </Link>
);

const MegaPanel = ({ menu, onNavigate }) => {
  const cardCount = menu.cards.length;
  return (
    <div
      key={menu.id}
      className={cn(
        "grid animate-fade-in gap-2 p-2",
        cardCount === 2 && "grid-cols-[minmax(0,1fr)_224px_224px]",
        cardCount === 1 && "grid-cols-[minmax(0,1fr)_260px]"
      )}
    >
      <div className="flex flex-col justify-center gap-0.5 pr-2">
        {menu.items.map((item) => (
          <MenuItem key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </div>
      {menu.cards.map((card) =>
        card.kind === "screen" ? (
          <ScreenCard key={card.title} card={card} onNavigate={onNavigate} />
        ) : (
          <SceneCard key={card.title} card={card} onNavigate={onNavigate} />
        )
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
 * Mobile sheet
 * ------------------------------------------------------------------------ */

const MobileSheet = ({ open, onClose }) => {
  const [expanded, setExpanded] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setExpanded(null);
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const rowClass =
    "flex w-full items-center justify-between py-3.5 text-left text-[19px] font-medium tracking-[-0.01em] text-frost transition-colors duration-fast hover:text-cloud";

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-canvas lg:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={onClose} aria-label="Virtara home">
          <Logo />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-frost hover:bg-white/[0.04] hover:text-cloud"
        >
          <IconX size={22} stroke={1.6} />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <ul className="divide-y divide-edge/70">
          {menus.map((menu) => {
            const isOpen = expanded === menu.id;
            return (
              <li key={menu.id}>
                <button
                  type="button"
                  className={rowClass}
                  aria-expanded={isOpen}
                  aria-controls={`m-${menu.id}`}
                  onClick={() => setExpanded(isOpen ? null : menu.id)}
                >
                  {menu.label}
                  <IconChevronDown
                    size={18}
                    stroke={1.6}
                    aria-hidden="true"
                    className={cn("text-quiet transition-transform duration-base ease-out", isOpen && "rotate-180 text-frost")}
                  />
                </button>
                {isOpen && (
                  <ul id={`m-${menu.id}`} className="animate-fade-in pb-3">
                    {menu.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-control px-1 py-2.5 text-body text-mist hover:text-cloud"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-edge bg-steel text-frost">
                            <item.icon size={16} stroke={1.6} aria-hidden="true" />
                          </span>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          {primaryLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={onClose} className={rowClass}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact-us" onClick={onClose} className={rowClass}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="shrink-0 border-t border-edge/70 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-6">
        <Button to={cta.to} onClick={onClose} size="lg" className="w-full">
          {cta.label}
        </Button>
        <p className="mt-4 text-center text-body text-mist">
          Ready to brief us?{" "}
          <Link to={secondaryCta.to} onClick={onClose} className="font-medium text-signal-soft hover:text-cloud">
            {secondaryCta.label}
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
 * Navbar
 * ------------------------------------------------------------------------ */

const OPEN_DELAY = 70;
const CLOSE_DELAY = 140;

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef(null);
  const triggers = useRef({});
  const location = useLocation();
  const panelId = useId();

  const clear = () => window.clearTimeout(timer.current);
  const close = useCallback(() => {
    clear();
    setActive(null);
  }, []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Hover intent: opening is near-instant once a menu is already showing, so
  // sweeping across triggers swaps panels without flicker.
  const scheduleOpen = (id) => {
    clear();
    timer.current = window.setTimeout(() => setActive(id), active ? 0 : OPEN_DELAY);
  };
  const scheduleClose = () => {
    clear();
    timer.current = window.setTimeout(() => setActive(null), CLOSE_DELAY);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes every menu.
  useEffect(() => {
    close();
    setMobileOpen(false);
  }, [location.pathname, location.hash, close]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        triggers.current[active]?.focus();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  useEffect(() => () => clear(), []);

  const activeMenu = menus.find((m) => m.id === active);
  const solid = scrolled || active;

  const navLink =
    "inline-flex h-9 items-center gap-1 rounded-control px-3.5 text-nav font-medium transition-colors duration-fast";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-base ease-out",
          solid ? "border-b border-edge/70 bg-canvas/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link to="/" aria-label="Virtara home" className="-ml-1 rounded-control p-1">
            <Logo />
          </Link>

          {/* Desktop */}
          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center">
              {menus.map((menu) => {
                const isActive = active === menu.id;
                return (
                  <li key={menu.id} onMouseEnter={() => scheduleOpen(menu.id)}>
                    <button
                      ref={(el) => (triggers.current[menu.id] = el)}
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => (isActive ? close() : (clear(), setActive(menu.id)))}
                      className={cn(navLink, isActive ? "text-cloud" : "text-frost hover:text-cloud")}
                    >
                      {menu.label}
                      <IconChevronDown
                        size={14}
                        stroke={2}
                        aria-hidden="true"
                        className={cn("text-quiet transition-transform duration-base ease-out", isActive && "rotate-180 text-frost")}
                      />
                    </button>
                  </li>
                );
              })}
              {primaryLinks.map((link) => (
                <li key={link.to} onMouseEnter={scheduleClose}>
                  <Link
                    to={link.to}
                    aria-current={location.pathname === link.to ? "page" : undefined}
                    className={cn(navLink, location.pathname === link.to ? "text-cloud" : "text-frost hover:text-cloud")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex" onMouseEnter={scheduleClose}>
            <Link to={secondaryCta.to} className={cn(navLink, "text-frost hover:text-cloud")}>
              {secondaryCta.label}
            </Link>
            <Button to={cta.to} size="sm" className="font-semibold">
              {cta.label}
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-frost hover:bg-white/[0.04] hover:text-cloud lg:hidden"
          >
            <IconMenu2 size={22} stroke={1.6} />
          </button>
        </div>

        {/* Mega panel */}
        <div
          id={panelId}
          className={cn("absolute inset-x-0 top-full hidden lg:block", !activeMenu && "pointer-events-none")}
          onMouseEnter={clear}
        >
          {activeMenu && (
            <div className="shell flex justify-center pt-2">
              <div className="w-full max-w-[920px] animate-menu-in overflow-hidden rounded-card border border-edge bg-charcoal/95 shadow-float backdrop-blur-xl">
                <MegaPanel menu={activeMenu} onNavigate={close} />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* The page dims and softens behind an open menu. */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 hidden bg-canvas/55 backdrop-blur-[6px] transition-opacity duration-base ease-out lg:block",
          activeMenu ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <MobileSheet open={mobileOpen} onClose={closeMobile} />
    </>
  );
};

export default Navbar;
