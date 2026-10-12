import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IconArrowLeft, IconRefresh } from "@tabler/icons-react";
import PageShell from "../components/layout/PageShell";
import PageHero from "../components/layout/PageHero";
import SectionHeading from "../components/layout/SectionHeading";
import ClosingBand from "../components/layout/ClosingBand";
import ClientWorkspace from "../components/home/ClientWorkspace";
import ServicesRail from "../components/home/ServicesRail";
import Button from "../components/ui/Button";
import { bg_hero } from "../assets";
import { cn } from "../utils/cn";

const trustClients = ["Vaja", "MPower Ratings", "Virtec Marketing", "Aureya", "Clarity"];

const discoverySteps = [
  {
    key: "revenueGoal",
    label: "Revenue goal",
    question: "What is your target monthly revenue from digital in the next 6 months?",
    options: ["R350k–R900k", "R900k–R1.8M", "R1.8M–R4.5M", "R4.5M+"],
  },
  {
    key: "leadVolume",
    label: "Lead requirement",
    question: "How many qualified leads do you need per month to hit that target?",
    options: ["10–25", "25–50", "50–100", "100+"],
  },
  {
    key: "primaryConstraint",
    label: "Main blocker",
    question: "What is the main blocker in your current funnel?",
    options: ["Low-quality traffic", "Poor site conversion", "Weak sales follow-through", "No clear analytics"],
  },
];

function LeadQualifier() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentStep = discoverySteps[stepIndex];
  const isComplete = stepIndex >= discoverySteps.length;

  const focus = useMemo(() => {
    if (!isComplete) return "";
    const blocker = answers.primaryConstraint;
    if (blocker === "Poor site conversion") return "Conversion architecture and CRO";
    if (blocker === "Low-quality traffic") return "Acquisition and SEO alignment";
    if (blocker === "Weak sales follow-through") return "Lead qualification and handoff system";
    return "Attribution and full-funnel optimisation";
  }, [answers, isComplete]);

  const answer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentStep.key]: value }));
    setStepIndex((prev) => prev + 1);
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers({});
  };

  return (
    <div className="overflow-hidden rounded-card border border-edge bg-charcoal shadow-frame">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-3.5">
        <span className="text-[13px] font-medium text-frost">Growth audit · quick scope</span>
        <div className="flex items-center gap-3">
          <div className="flex gap-1" aria-hidden="true">
            {discoverySteps.map((s, i) => (
              <span
                key={s.key}
                className={cn(
                  "h-1 w-6 rounded-full transition-colors duration-base",
                  i < stepIndex ? "bg-signal" : i === stepIndex ? "bg-frost/60" : "bg-edge-strong"
                )}
              />
            ))}
          </div>
          <span className="figure text-[13px] text-mist">
            {Math.min(stepIndex + 1, discoverySteps.length)}/{discoverySteps.length}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-8" aria-live="polite">
        {!isComplete ? (
          <div key={currentStep.key} className="animate-fade-in">
            <p className="text-caption text-quiet">{currentStep.label}</p>
            <h3 className="mt-2 text-title text-cloud">{currentStep.question}</h3>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => answer(option)}
                  className="group flex items-center justify-between rounded-control border border-edge bg-ink px-4 py-3.5 text-left text-body text-frost transition-colors duration-fast hover:border-signal/50 hover:bg-steel hover:text-cloud"
                >
                  {option}
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full border border-edge-strong transition-colors duration-fast group-hover:border-signal group-hover:bg-signal/20"
                  />
                </button>
              ))}
            </div>
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={() => setStepIndex((i) => i - 1)}
                className="mt-5 inline-flex items-center gap-1.5 text-nav text-mist transition-colors duration-fast hover:text-cloud"
              >
                <IconArrowLeft size={15} stroke={1.8} aria-hidden="true" />
                Back
              </button>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-caption text-quiet">Your highest-leverage focus</p>
            <h3 className="mt-2 text-title text-cloud">{focus}</h3>
            <dl className="mt-6 divide-y divide-edge rounded-control border border-edge bg-ink text-nav">
              {discoverySteps.map((s) => (
                <div key={s.key} className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="font-normal text-mist">{s.label}</dt>
                  <dd className="text-right font-medium text-cloud">{answers[s.key]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/start-your-project" showArrow>
                Book a strategy audit
              </Button>
              <Button variant="secondary" onClick={restart} icon={<IconRefresh stroke={1.8} />}>
                Start over
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <PageShell>
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

      <PageHero
        announcement={{ label: "Free: the website conversion checklist", to: "/resources/health-check" }}
        title="We build digital assets that outperform your competition."
        lead="Premium web strategy, engineering and SEO for South African brands that care about measurable outcomes."
        actions={
          <>
            <Button href="#lead-qualifier" size="lg" className="font-semibold">
              Book a strategy audit
            </Button>
            <Button to="/our-work" variant="secondary" size="lg">
              Explore client wins
            </Button>
          </>
        }
      >
        <ClientWorkspace />
      </PageHero>

      {/* Social proof */}
      <section aria-labelledby="trust-heading" className="pb-8 pt-20 md:pt-28">
        <div className="shell text-center">
          <h2 id="trust-heading" className="text-body font-normal text-frost">
            Trusted by growth-focused South African brands
          </h2>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {trustClients.map((client) => (
              <li key={client} className="text-[19px] font-semibold tracking-[-0.02em] text-mist/80">
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="services-heading">
        <div className="shell">
          <SectionHeading
            id="services-heading"
            title="One team for the site, the search and the growth behind it."
            lead="Strategy, design, engineering, SEO and paid media under one roof — so nothing gets lost between agencies. Every package is priced in rand, up front."
            action={
              <Button to="/services" showArrow>
                Services & pricing
              </Button>
            }
          />
          <div className="mt-12">
            <ServicesRail />
          </div>
        </div>
      </section>

      {/* Qualifier */}
      <section id="lead-qualifier" className="section" aria-labelledby="qualifier-heading">
        <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading
            id="qualifier-heading"
            title="Find your highest-leverage fix in three questions."
            lead="Tell us where you want to be and what's in the way. We'll point you at the part of your funnel that will move revenue first — then go deeper on a strategy audit."
          />
          <LeadQualifier />
        </div>
      </section>

      <ClosingBand
        title="Ready to outperform?"
        lead="Book a strategy audit and leave with a clear, prioritised plan for your site."
        actions={
          <>
            <Button to="/contact-us" size="lg" className="font-semibold">
              Book an audit
            </Button>
            <Button to="/start-your-project" variant="secondary" size="lg">
              Start a project
            </Button>
          </>
        }
      />
    </PageShell>
  );
}

export default Home;
