import { Link } from "react-router-dom";
import { IconBrandX, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import Logo from "./brand/Logo";
import { menus } from "./navigation/menus";

const companyLinks = [
  { title: "Our work", to: "/our-work" },
  { title: "Start a project", to: "/start-your-project" },
  { title: "Contact", to: "/contact-us" },
  { title: "Brand book", to: "/brand" },
];

const legalLinks = [
  { title: "Privacy", to: "/legal/privacy-policy" },
  { title: "Terms", to: "/legal/terms-of-service" },
  { title: "Cookies", to: "/legal/cookie-policy" },
];

const socials = [
  { label: "Virtara on X", href: "https://x.com/Virtara_SA", icon: IconBrandX },
  { label: "Virtara on LinkedIn", href: "https://www.linkedin.com/company/virtara", icon: IconBrandLinkedin },
  { label: "Virtara on Instagram", href: "https://www.instagram.com/virtara.io/", icon: IconBrandInstagram },
];

const columns = [
  ...menus.map((m) => ({ heading: m.label, links: m.items.map(({ title, to }) => ({ title, to })) })),
  { heading: "Company", links: companyLinks },
];

const Footer = () => (
  <footer className="relative border-t border-edge bg-canvas">
    <div className="shell py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_2.4fr]">
        <div className="max-w-xs">
          <Link to="/" aria-label="Virtara home" className="inline-block rounded-control">
            <Logo />
          </Link>
          <p className="mt-4 text-nav font-normal leading-relaxed text-mist">
            Websites, SEO and growth systems for South African businesses that measure results.
          </p>
          <address className="mt-6 space-y-1.5 text-nav font-normal not-italic text-quiet">
            <p>16 Hume Road, Johannesburg, 2092</p>
            <p>
              <a href="mailto:info@virtara.co.za" className="transition-colors duration-fast hover:text-cloud">
                info@virtara.co.za
              </a>
            </p>
            <p>
              <a href="tel:+27723271040" className="transition-colors duration-fast hover:text-cloud">
                +27 72 327 1040
              </a>
            </p>
          </address>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-control border border-edge text-mist transition-colors duration-fast hover:border-edge-strong hover:text-cloud"
                >
                  <Icon size={17} stroke={1.6} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h2 className="text-nav font-medium text-cloud">{col.heading}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-nav font-normal text-mist transition-colors duration-fast hover:text-cloud">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-edge pt-6 text-caption font-normal text-quiet sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Virtara. Made in South Africa.</p>
        <ul className="flex gap-5">
          {legalLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="transition-colors duration-fast hover:text-cloud">
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
