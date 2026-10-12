import { cn } from "../../utils/cn";

/**
 * Section introduction: a 500-weight heading with Frost lead underneath and an
 * optional action. Left-aligned by default (Featurebase "feature text block");
 * use align="center" for social-proof and closing bands.
 */
const SectionHeading = ({ title, lead, action, align = "left", className, as: Heading = "h2", id }) => {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <Heading id={id} className="text-section text-cloud">
        {title}
      </Heading>
      {lead && <p className="mt-4 text-body text-frost md:text-[17px] md:leading-[1.6]">{lead}</p>}
      {action && <div className={cn("mt-6 flex flex-wrap gap-3", centered && "justify-center")}>{action}</div>}
    </div>
  );
};

export default SectionHeading;
