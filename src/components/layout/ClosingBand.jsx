import { drakensberg } from "../../assets";
import { cn } from "../../utils/cn";

/**
 * The page close. The Drakensberg at blue hour sits under a centred heading
 * and the page's one next step. Used once per page, last before the footer.
 */
const ClosingBand = ({ title, lead, actions, className }) => (
  <section className={cn("section pt-8 md:pt-12", className)}>
    <div className="shell">
      <div className="relative isolate overflow-hidden rounded-media border border-edge bg-ink px-6 py-20 text-center sm:px-12 md:py-28">
        <img
          src={drakensberg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="2000"
          height="838"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_60%] opacity-80"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,6,8,0.55)_0%,rgba(5,6,8,0.2)_45%,rgba(5,6,8,0.85)_100%)]" />
        <h2 className="mx-auto max-w-2xl text-section text-cloud">{title}</h2>
        {lead && <p className="mx-auto mt-4 max-w-xl text-body text-frost md:text-[17px]">{lead}</p>}
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
      </div>
    </div>
  </section>
);

export default ClosingBand;
