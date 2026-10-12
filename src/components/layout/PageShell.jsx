import Navbar from "../Navbar";
import Footer from "../Footer";
import { cn } from "../../utils/cn";

/**
 * Every public page: skip link, navigation, the page, the footer.
 * Pages render their sections as children and never repeat this chrome.
 */
const PageShell = ({ children, className, footer = true }) => (
  <>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-cloud focus:px-4 focus:py-2 focus:text-nav focus:text-charcoal"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" className={cn("relative min-h-screen bg-canvas text-mist", className)}>
      {children}
    </main>
    {footer && <Footer />}
  </>
);

export default PageShell;
