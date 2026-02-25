import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { SiFirebase, SiSanity, SiTailwindcss, SiThreedotjs } from 'react-icons/si';
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { virtec, vaja, mpower, clarity, aureya } from '../assets';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const projectShowcase = [
  {
    title: 'Virtec Marketing',
    image: virtec,
    category: 'Marketing',
    summary: 'Complete website redesign and conversion-focused lead acquisition system.',
    kpi: '+40% conversion lift',
    before: 'Low-intent traffic and unclear funnel architecture.',
    after: 'Offer-focused pages and cleaner action paths for qualified leads.',
    stack: ['React', 'TailwindCSS', 'Node.js'],
    link: 'https://virtec.vercel.app',
    layoutClass: 'md:col-span-6 lg:col-span-4'
  },
  {
    title: 'Vaja',
    image: vaja,
    category: 'Construction',
    summary: 'High-trust digital presence for premium sauna and steam services.',
    kpi: '+35% inquiry increase',
    before: 'Outdated visual language and fragmented service messaging.',
    after: 'Premium brand narrative with clear service hierarchy.',
    stack: ['React', 'TailwindCSS', 'Three.js'],
    link: 'https://vaja-web.vercel.app',
    layoutClass: 'md:col-span-3 lg:col-span-2'
  },
  {
    title: 'MPower Ratings',
    image: mpower,
    category: 'Finance',
    summary: 'Authority-first website and demand generation support for BEE services.',
    kpi: '+50% lead conversion',
    before: 'Generic pages with low differentiation in a competitive niche.',
    after: 'Proof-backed pages and stronger lead intent qualification.',
    stack: ['React', 'Firebase', 'Node.js'],
    link: 'https://www.mpowerratings.co.za',
    layoutClass: 'md:col-span-3 lg:col-span-2'
  },
  {
    title: 'Aureya Marketing',
    image: aureya,
    category: 'Agency',
    summary: 'Modern agency platform designed around service clarity and growth goals.',
    kpi: '+45% consult requests',
    before: 'Inconsistent positioning and low trust signals.',
    after: 'Sharper positioning with conversion-focused service blocks.',
    stack: ['React', 'TailwindCSS', 'Sanity'],
    link: 'https://www.aureya.co.za',
    layoutClass: 'md:col-span-3 lg:col-span-2'
  },
  {
    title: 'Clarity Engineering',
    image: clarity,
    category: 'Engineering',
    summary: 'Professional web experience for a consulting engineering practice.',
    kpi: '+38% conversion increase',
    before: 'Poor UX and unclear value communication for technical services.',
    after: 'Clear project credibility and intent-driven CTAs.',
    stack: ['React', 'TailwindCSS', 'Three.js'],
    link: 'https://www.clarityce.co.za',
    layoutClass: 'md:col-span-6 lg:col-span-4'
  }
];

const techStack = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#6FD96F' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: '#3FC6E8' },
  { name: 'Sanity', icon: SiSanity, color: '#FF7065' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#C8D7FF' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCC52' }
];

function Work() {
  return (
    <>
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

      <main className="bg-[#050910] min-h-screen text-white virtara-body">
        <Navbar />

        <section className="pt-32 md:pt-36 pb-14 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(20,99,255,0.28),transparent_38%),radial-gradient(circle_at_78%_5%,rgba(96,219,255,0.2),transparent_34%)]" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-5xl mx-auto text-center"
            >
              <Badge variant="primary" size="lg" className="mb-5">Proof of Work</Badge>
              <h1 className="virtara-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                Digital Projects Built to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]"> Outperform</span>
              </h1>
              <p className="text-lg md:text-xl text-[#c2d4ff] max-w-3xl mx-auto leading-relaxed">
                Real before-vs-after outcomes across strategy, design and engineering.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {projectShowcase.map((project, index) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className={`group ${project.layoutClass}`}
                >
                  <Card className="h-full border border-white/10 overflow-hidden bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]" hover>
                    <div className="relative overflow-hidden h-56 md:h-64">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" size="sm">{project.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <p className="text-[#8df6ff] font-semibold text-sm">{project.kpi}</p>
                        <FaExternalLinkAlt className="text-white/70 text-sm" />
                      </div>
                    </div>

                    <Card.Content className="md:p-7">
                      <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">{project.title}</h2>
                      <p className="text-sm md:text-base text-[#c8d8ff] mb-4 leading-relaxed">{project.summary}</p>
                      <div className="space-y-2 text-sm md:text-[15px] mb-5">
                        <p className="text-[#ffabb1]">
                          <span className="font-semibold">Before:</span> {project.before}
                        </p>
                        <p className="text-[#9dfec5]">
                          <span className="font-semibold">After:</span> {project.after}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 text-xs rounded-full border border-white/15 text-[#d5e3ff] bg-white/[0.03]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </Card.Content>
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="max-w-5xl mx-auto border border-[#74a7ff]/35 bg-[linear-gradient(130deg,rgba(7,17,35,0.9),rgba(8,16,33,0.55))]">
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#8df6ff] mb-1">50+</div>
                    <div className="text-sm text-[#c7d9ff]">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#8df6ff] mb-1">95%</div>
                    <div className="text-sm text-[#c7d9ff]">Client Retention</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#8df6ff] mb-1">200%+</div>
                    <div className="text-sm text-[#c7d9ff]">Avg Traffic Growth</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#8df6ff] mb-1">24/7</div>
                    <div className="text-sm text-[#c7d9ff]">Support Access</div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <h3 className="virtara-display text-3xl md:text-4xl text-center mb-8">Core Technology Stack</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center"
                  >
                    <tech.icon className="w-8 h-8 mx-auto mb-3" style={{ color: tech.color }} />
                    <p className="text-sm text-[#d8e5ff]">{tech.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="max-w-5xl mx-auto border border-[#74a7ff]/35 bg-[linear-gradient(130deg,rgba(7,17,35,0.9),rgba(8,16,33,0.55))] text-center">
              <Card.Content>
                <h3 className="virtara-display text-3xl md:text-5xl mb-5">Want Results Like These?</h3>
                <p className="text-[#c7d9ff] max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
                  We can map your current funnel, identify conversion bottlenecks, and build a practical growth roadmap.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to="/start-your-project">
                    <Button variant="gradient" size="lg" showArrow>
                      Book a Strategy Audit
                    </Button>
                  </Link>
                  <a href="/services">
                    <Button variant="outline" size="lg">
                      View Services
                    </Button>
                  </a>
                </div>
              </Card.Content>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Work;
