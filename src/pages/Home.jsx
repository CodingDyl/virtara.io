import { lazy, Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// three.js + react-three-fiber is ~600 kB. The hero reads correctly without
// the WebGL layer, so it loads after paint instead of blocking it.
const Silk = lazy(() => import("../components/Silk"));
import Badge from "../components/ui/Badge";
import { bg_hero, mpower, vaja, virtec } from "../assets";

const trustClients = ["Vaja", "MPower Ratings", "Virtec Marketing", "Aureya", "Clarity"];

const proofCards = [
  {
    id: "vaja",
    title: "Vaja",
    kpi: "30% Conversion Rate Lift",
    before: "Outdated UX and unclear service pages.",
    after: "Focused information architecture and conversion-first CTAs.",
    image: vaja,
    link: "https://vaja.co.za",
    size: "md:col-span-2"
  },
  {
    id: "mpower",
    title: "MPower Ratings",
    kpi: "2.1x More Qualified Inquiries",
    before: "Low-intent leads from broad landing pages.",
    after: "High-intent journey mapped around BEE verification use-cases.",
    image: mpower,
    link: "https://mpowerratings.co.za",
    size: "md:col-span-1"
  },
  {
    id: "virtec",
    title: "Virtec Marketing",
    kpi: "41% Increase in Demo Requests",
    before: "No visual hierarchy for key decision points.",
    after: "Bento storytelling with clear offer framing and proof blocks.",
    image: virtec,
    link: "https://virtec.vercel.app",
    size: "md:col-span-1"
  }
];

const tickerResults = [
  "Vaja: +30% conversions in 90 days",
  "MPower Ratings: +2.1x qualified leads",
  "Virtec: +41% demo bookings",
  "Average lighthouse performance: 97+",
  "Latest SEO sprint: +18 ranking keywords this week"
];

const discoverySteps = [
  {
    key: "revenueGoal",
    question: "What is your target monthly revenue from digital in the next 6 months?",
    options: ["R350k-R900k", "R900k-R1.8M", "R1.8M-R4.5M", "R4.5M+"]
  },
  {
    key: "leadVolume",
    question: "How many qualified leads do you need per month to hit that target?",
    options: ["10-25", "25-50", "50-100", "100+"]
  },
  {
    key: "primaryConstraint",
    question: "What is the main blocker in your current funnel?",
    options: ["Low-quality traffic", "Poor site conversion", "Weak sales follow-through", "No clear analytics"]
  }
];

function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentStep = discoverySteps[stepIndex];
  const isQuizComplete = stepIndex >= discoverySteps.length;

  const suggestedAuditFocus = useMemo(() => {
    if (!isQuizComplete) return "";

    const blocker = answers.primaryConstraint;
    if (blocker === "Poor site conversion") return "Conversion architecture and CRO";
    if (blocker === "Low-quality traffic") return "Acquisition and SEO alignment";
    if (blocker === "Weak sales follow-through") return "Lead qualification and handoff system";
    return "Attribution and full-funnel optimization";
  }, [answers, isQuizComplete]);

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentStep.key]: value }));
    setStepIndex((prev) => prev + 1);
  };

  return (
    <main className="bg-[#060A11] text-white min-h-screen virtara-body">
      <Helmet>
        <title>Virtara | Digital Assets That Outperform Your Competition</title>
        <meta
          name="description"
          content="Virtara builds high-performance digital assets for growth-focused brands. See measurable outcomes, live client proof, and book a strategy audit."
        />
        <meta
          name="keywords"
          content="digital agency, web design, web development, conversion optimization, SEO, lead generation"
        />
        <link rel="canonical" href="https://virtara.co.za/" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Virtara",
              "description": "We build digital assets that outperform the competition.",
              "image": "${bg_hero}",
              "url": "https://virtara.co.za/",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "South Africa"
              },
              "serviceType": ["Web Design", "Web Development", "SEO", "Growth Strategy"]
            }
          `}
        </script>
      </Helmet>

      <Navbar />

      <section className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="absolute inset-0 bg-[#04070c]" />}>
            <Silk speed={4} scale={0.95} color="#0059ff" noiseIntensity={1.05} rotation={0} />
          </Suspense>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(3,104,255,0.25),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(0,232,255,0.2),transparent_45%),linear-gradient(180deg,rgba(4,7,12,0.75)_0%,rgba(6,10,17,0.96)_70%)]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-5"
            >
              <Badge variant="primary" size="lg">Outcome-First Digital Agency</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75 }}
              className="virtara-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl"
            >
              <span className="inline-block">We Build Digital Assets</span>{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#35d7ff] via-[#66a4ff] to-[#9ff0ff]">that Outperform</span>{" "}
              <span className="inline-block">Your Competition.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="max-w-2xl text-lg sm:text-xl text-[#d0dcff] mt-8 leading-relaxed"
            >
              Premium web strategy, engineering, and SEO execution for brands that care about measurable outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.65 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  document.querySelector("#lead-qualifier")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-full font-semibold text-[#03152f] bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] hover:brightness-110 transition-all duration-300 shadow-[0_8px_45px_rgba(25,139,255,0.35)] flex items-center gap-3"
              >
                <span>Book a Strategy Audit</span>
                <FaArrowRight />
              </button>

              <Link to="/our-work">
                <button className="px-8 py-4 rounded-full border border-white/20 backdrop-blur-xl bg-white/[0.04] hover:bg-white/[0.09] transition-colors duration-300">
                  Explore Client Wins
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070d17]">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm sm:text-base text-[#b3c7ff]">
            <span className="uppercase tracking-[0.22em] text-[#7b90bf]">Trusted by</span>
            {trustClients.map((client) => (
              <span key={client} className="font-semibold tracking-wide">{client}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#050910]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-12"
          >
            <h2 className="virtara-display text-4xl sm:text-5xl md:text-6xl">Proof of Work</h2>
            <p className="mt-4 text-[#b3c7ff] max-w-3xl text-lg">
              Bento-style project modules with before vs. after clarity. Every card links straight to the live site.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofCards.map((card, index) => (
              <motion.a
                key={card.id}
                href={card.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`${card.size} group rounded-[26px] p-[1px] bg-gradient-to-br from-[#2d4cff] via-[#57d8ff] to-[#192436]`}
              >
                <div className="h-full rounded-[25px] bg-[#071122]/85 border border-white/10 p-5 sm:p-6 backdrop-blur-xl flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#7ea4ff]">Case Study</span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#0f1728]">
                    <img
                      src={card.image}
                      alt={`${card.title} website, redesigned by Virtara`}
                      loading="lazy"
                      width="1280"
                      height="800"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      Visit the live site
                      <FaArrowRight className="text-[#7af5ff]" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="mt-4 text-[#86f8ff] font-semibold">{card.kpi}</p>

                  <div className="mt-4 space-y-3 text-sm text-[#c6d7ff] leading-relaxed">
                    <p>
                      <span className="text-[#ff9ca5] font-medium">Before:</span> {card.before}
                    </p>
                    <p>
                      <span className="text-[#94ffc0] font-medium">After:</span> {card.after}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 border-y border-white/10 bg-[#070d17] overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...tickerResults, ...tickerResults].map((result, index) => (
              <div key={`${result}-${index}`} className="ticker-item">
                <FaCheckCircle className="text-[#7af5ff]" />
                <span>{result}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lead-qualifier" className="py-20 md:py-24 bg-[#050910]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl mx-auto rounded-[32px] border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] backdrop-blur-2xl p-6 sm:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="virtara-display text-3xl sm:text-4xl md:text-5xl">Interactive Lead Qualifier</h2>
              <span className="text-sm uppercase tracking-[0.18em] text-[#99b8ff]">
                Step {Math.min(stepIndex + 1, discoverySteps.length)} of {discoverySteps.length}
              </span>
            </div>

            {!isQuizComplete ? (
              <div>
                <h3 className="text-xl sm:text-2xl text-[#e7f0ff] mb-6 leading-relaxed">{currentStep.question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentStep.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="text-left px-5 py-4 rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-[#70d0ff]/70 transition-all duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg text-[#dbebff]">
                  Great, your growth target is clear. Based on your inputs, your likely highest-leverage focus is <span className="font-semibold text-[#8fe8ff]">{suggestedAuditFocus}</span>.
                </p>
                <div className="rounded-2xl border border-[#5ca3ff]/45 bg-[#0a1527] p-5 text-sm text-[#b7ceff] space-y-2">
                  <p>Revenue Goal: {answers.revenueGoal}</p>
                  <p>Lead Requirement: {answers.leadVolume}</p>
                  <p>Primary Constraint: {answers.primaryConstraint}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link to="/start-your-project">
                    <button className="px-8 py-4 rounded-full font-semibold text-[#03152f] bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] hover:brightness-110 transition-all duration-300 shadow-[0_8px_45px_rgba(25,139,255,0.35)] flex items-center gap-3">
                      <span>Book a Strategy Audit</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setStepIndex(0);
                      setAnswers({});
                    }}
                    className="px-6 py-4 rounded-full border border-white/20 hover:bg-white/[0.08] transition-colors"
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
