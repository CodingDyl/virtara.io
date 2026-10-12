import { Link } from "react-router-dom";
import Logo from "../brand/Logo";
import Footer from "../Footer";

/**
 * Chrome for transactional pages reached from email (unsubscribe flows):
 * just the logo, the content centred on the stage, and the footer.
 */
const MinimalShell = ({ children }) => (
  <>
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="shell flex h-16 items-center">
        <Link to="/" aria-label="Virtara home" className="rounded-control">
          <Logo />
        </Link>
      </div>
    </header>
    <main id="main" className="relative flex min-h-screen items-center overflow-hidden bg-canvas py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-glow" />
      <div className="shell relative max-w-xl text-center">{children}</div>
    </main>
    <Footer />
  </>
);

export default MinimalShell;
