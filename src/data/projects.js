import { virtec, vaja, mpower, clarity, aureya } from "../assets";

/**
 * Client work. One record per project, read by Home's workspace and the Work
 * page. KPI copy is owner-supplied — never invent new numbers here.
 *
 * `kpi` is split into `value` + `label` so the figure can be set in the
 * signature face.
 */
export const projects = [
  {
    id: "vaja",
    title: "Vaja",
    category: "Construction",
    image: vaja,
    link: "https://vaja.co.za",
    domain: "vaja.co.za",
    summary: "High-trust digital presence for premium sauna and steam services.",
    kpi: { value: "+30%", label: "conversion rate lift" },
    before: "Outdated UX and unclear service pages.",
    after: "Focused information architecture and conversion-first CTAs.",
    stack: ["React", "TailwindCSS", "Three.js"],
  },
  {
    id: "mpower",
    title: "MPower Ratings",
    category: "Finance",
    image: mpower,
    link: "https://www.mpowerratings.co.za",
    domain: "mpowerratings.co.za",
    summary: "Authority-first website and demand generation for BEE verification.",
    kpi: { value: "2.1×", label: "more qualified inquiries" },
    before: "Low-intent leads from broad landing pages.",
    after: "A high-intent journey mapped around BEE verification use-cases.",
    stack: ["React", "Firebase", "Node.js"],
  },
  {
    id: "virtec",
    title: "Virtec Marketing",
    category: "Marketing",
    image: virtec,
    link: "https://virtec.vercel.app",
    domain: "virtec.vercel.app",
    summary: "Complete redesign and a conversion-focused lead acquisition system.",
    kpi: { value: "+41%", label: "demo requests" },
    before: "No visual hierarchy for key decision points.",
    after: "Bento storytelling with clear offer framing and proof blocks.",
    stack: ["React", "TailwindCSS", "Node.js"],
  },
  {
    id: "aureya",
    title: "Aureya Marketing",
    category: "Agency",
    image: aureya,
    link: "https://www.aureya.co.za",
    domain: "aureya.co.za",
    summary: "Modern agency platform designed around service clarity and growth goals.",
    kpi: { value: "+45%", label: "consult requests" },
    before: "Inconsistent positioning and low trust signals.",
    after: "Sharper positioning with conversion-focused service blocks.",
    stack: ["React", "TailwindCSS", "Sanity"],
  },
  {
    id: "clarity",
    title: "Clarity Engineering",
    category: "Engineering",
    image: clarity,
    link: "https://www.clarityce.co.za",
    domain: "clarityce.co.za",
    summary: "Professional web experience for a consulting engineering practice.",
    kpi: { value: "+38%", label: "conversion increase" },
    before: "Poor UX and unclear value communication for technical services.",
    after: "Clear project credibility and intent-driven CTAs.",
    stack: ["React", "TailwindCSS", "Three.js"],
  },
];
