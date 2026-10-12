import { Helmet } from 'react-helmet-async';
import { IconArrowUpRight } from '@tabler/icons-react';
import { SiFirebase, SiSanity, SiTailwindcss, SiThreedotjs } from 'react-icons/si';
import { FaNodeJs, FaReact } from 'react-icons/fa';
import PageShell from '../components/layout/PageShell';
import PageHero from '../components/layout/PageHero';
import SectionHeading from '../components/layout/SectionHeading';
import ClosingBand from '../components/layout/ClosingBand';
import Button from '../components/ui/Button';
import { projects } from '../data/projects';
import { cn } from '../utils/cn';

const techStack = [
  { name: 'React', icon: FaReact },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'TailwindCSS', icon: SiTailwindcss },
  { name: 'Sanity', icon: SiSanity },
  { name: 'Three.js', icon: SiThreedotjs },
  { name: 'Firebase', icon: SiFirebase }
];

const ProjectCard = ({ project, wide, eager }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noreferrer"
    className={cn(
      'group flex flex-col overflow-hidden rounded-card border border-edge bg-ink transition-colors duration-base ease-out hover:border-edge-strong',
      wide && 'lg:col-span-2'
    )}
  >
    {/* The live site in a browser frame */}
    <div className="border-b border-edge bg-charcoal p-3 pb-0 sm:p-4 sm:pb-0">
      <div className="overflow-hidden rounded-t-[10px] border border-b-0 border-edge bg-steel">
        <div className="flex items-center gap-2 border-b border-edge px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-edge-strong" />
            <span className="h-2 w-2 rounded-full bg-edge-strong" />
            <span className="h-2 w-2 rounded-full bg-edge-strong" />
          </span>
          <span className="truncate rounded-[6px] bg-ink px-2 py-0.5 text-[11px] text-quiet">{project.domain}</span>
        </div>
        <div className={cn('relative overflow-hidden', wide ? 'aspect-[16/8]' : 'aspect-[16/10]')}>
          <img
            src={project.image}
            alt={`${project.title} website, built by Virtara`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            width="1280"
            height="800"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-slow ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-1.5 text-feature text-cloud">
            {project.title}
            <IconArrowUpRight size={16} stroke={2} aria-hidden="true" className="text-quiet transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cloud" />
            <span className="sr-only">(opens live site in a new tab)</span>
          </h2>
          <p className="text-caption text-quiet">{project.category}</p>
        </div>
        <div className="text-right">
          <p className="figure text-[26px] leading-none text-cloud">{project.kpi.value}</p>
          <p className="mt-1 text-caption text-mist">{project.kpi.label}</p>
        </div>
      </div>
      <p className="mt-4 text-nav font-normal leading-relaxed text-mist">{project.summary}</p>
      <dl className="mt-5 grid gap-3 border-t border-edge pt-5 text-nav font-normal sm:grid-cols-2">
        <div>
          <dt className="flex items-center gap-2 font-medium text-frost">
            <span className="h-1.5 w-1.5 rounded-full bg-critical" aria-hidden="true" />
            Before
          </dt>
          <dd className="mt-1 leading-relaxed text-mist">{project.before}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 font-medium text-frost">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
            After
          </dt>
          <dd className="mt-1 leading-relaxed text-mist">{project.after}</dd>
        </div>
      </dl>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Stack">
        {project.stack.map((item) => (
          <li key={item} className="rounded-pill border border-edge px-2.5 py-1 text-[12px] text-mist">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </a>
);

function Work() {
  // Lead with two wide features, then the rest in a three-up row.
  const [first, second, ...rest] = projects;

  return (
    <PageShell>
      <Helmet>
        <title>Our Work | Conversion-Focused Digital Projects</title>
        <meta
          name="description"
          content="Explore Virtara case studies and project outcomes across web development, design, and growth systems."
        />
        <meta
          name="keywords"
          content="digital agency portfolio, case studies, web development projects, conversion optimization"
        />
        <link rel="canonical" href="https://virtara.co.za/our-work" />
      </Helmet>

      <PageHero
        announcement={{ label: 'Proof of work' }}
        title="Digital projects built to outperform."
        lead="Real before-and-after outcomes across strategy, design and engineering. Every card opens the live site."
      />

      <section aria-label="Projects" className="pb-20 md:pb-28">
        <div className="shell grid gap-4 lg:grid-cols-3">
          <ProjectCard project={first} wide eager />
          <ProjectCard project={second} eager />
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section aria-label="Track record" className="pb-20 md:pb-28">
        <div className="shell">
          <dl className="grid grid-cols-2 divide-edge border-y border-edge md:grid-cols-4 md:divide-x">
            {[
              ['50+', 'Projects delivered'],
              ['95%', 'Client retention'],
              ['200%+', 'Average traffic growth'],
              ['24/7', 'Support access'],
            ].map(([value, label]) => (
              <div key={label} className="py-6 md:px-8 md:first:pl-0">
                <dt className="text-nav font-normal text-mist">{label}</dt>
                <dd className="figure mt-1 text-[28px] text-cloud">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section pt-0 md:pt-0" aria-labelledby="stack-heading">
        <div className="shell">
          <SectionHeading
            id="stack-heading"
            align="center"
            title="Core technology stack"
            lead="Modern, fast, maintainable — chosen for the job, not the trend."
          />
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {techStack.map((tech) => (
              <li key={tech.name} className="flex items-center gap-2.5 text-body font-medium text-mist">
                <tech.icon className="h-5 w-5 text-frost" aria-hidden="true" />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand
        title="Want results like these?"
        lead="We'll map your current funnel, find the conversion bottlenecks, and build a practical growth roadmap."
        actions={
          <>
            <Button to="/start-your-project" size="lg" className="font-semibold">
              Book a strategy audit
            </Button>
            <Button to="/services" variant="secondary" size="lg">
              View services
            </Button>
          </>
        }
      />
    </PageShell>
  );
}

export default Work;
