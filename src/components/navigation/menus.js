import {
  IconBrowser,
  IconSearch,
  IconChartArrowsVertical,
  IconSparkles,
  IconShieldCheck,
  IconRocket,
  IconBuildingSkyscraper,
  IconStack2,
  IconListDetails,
  IconNotebook,
  IconClipboardCheck,
  IconCalendarEvent,
  IconPalette,
} from "@tabler/icons-react";
import { capetown, karoo, joburg, vaja, healthCheckPreview } from "../../assets";

/**
 * Navigation content. The navbar, the mobile sheet and the footer all read
 * from here, so a page is added to the site's navigation in one place.
 *
 * Each mega menu: `items` (the list column) and up to two `cards`.
 * Card kinds: "scene" — full-bleed atmospheric image with copy at the foot;
 * "screen" — a product-style frame around a real screenshot.
 */
export const menus = [
  {
    id: "services",
    label: "Services",
    items: [
      { title: "Web design & development", desc: "Conversion-first sites and commerce builds", to: "/services#development", icon: IconBrowser },
      { title: "SEO & content", desc: "Technical, local and content SEO retainers", to: "/services#seo", icon: IconSearch },
      { title: "Paid media & growth", desc: "Google and Meta campaigns tied to your CAC", to: "/services#growth", icon: IconChartArrowsVertical },
      { title: "Brand & retainers", desc: "Positioning, content and a fractional growth team", to: "/services#retainer", icon: IconSparkles },
      { title: "Maintenance & support", desc: "Security, updates, backups and hosting ops", to: "/maintenance-support", icon: IconShieldCheck },
    ],
    cards: [
      {
        kind: "scene",
        image: capetown,
        title: "Built for South African brands",
        desc: "Strategy, design and engineering from one team in Johannesburg.",
        to: "/our-work",
      },
      {
        kind: "screen",
        image: vaja,
        label: "Featured project",
        title: "Vaja",
        desc: "A premium sauna and steam brand, rebuilt around clear service paths.",
        to: "/our-work",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      { title: "Starter website", desc: "A professional presence for new businesses", to: "/web-development/starter", icon: IconRocket },
      { title: "Professional website", desc: "Multi-page sites with CMS and advanced SEO", to: "/web-development/professional", icon: IconStack2 },
      { title: "Enterprise website", desc: "Custom platforms with complex requirements", to: "/web-development/enterprise", icon: IconBuildingSkyscraper },
      { title: "SEO packages", desc: "Rank for the searches your buyers make", to: "/seo", icon: IconSearch },
      { title: "All services & pricing", desc: "Every package, side by side, in rand", to: "/services", icon: IconListDetails },
    ],
    cards: [
      {
        kind: "scene",
        image: joburg,
        title: "Not sure which fits?",
        desc: "Answer a few questions and we'll scope it with you.",
        to: "/start-your-project",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      { title: "Blog", desc: "Field notes on SEO, performance and conversion", to: "/web-development-blog", icon: IconNotebook },
      { title: "Conversion checklist", desc: "Find out why your site isn't converting", to: "/resources/health-check", icon: IconClipboardCheck },
      { title: "Book a website audit", desc: "A personal review of your site with our team", to: "/resources/audit", icon: IconCalendarEvent },
      { title: "Brand book", desc: "The Virtara design system, in the open", to: "/brand", icon: IconPalette },
    ],
    cards: [
      {
        kind: "scene",
        image: karoo,
        title: "Read the blog",
        desc: "What we learn shipping sites for South African businesses.",
        to: "/web-development-blog",
      },
      {
        kind: "screen",
        image: healthCheckPreview,
        label: "Free download",
        title: "Website conversion checklist",
        desc: "A five-minute self-assessment for your site.",
        to: "/resources/health-check",
      },
    ],
  },
];

export const primaryLinks = [{ label: "Our work", to: "/our-work" }];

export const cta = { label: "Book an audit", to: "/contact-us" };
export const secondaryCta = { label: "Start a project", to: "/start-your-project" };
