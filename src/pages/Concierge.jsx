import { Helmet } from "react-helmet-async";
import { IconBook2, IconMessageChatbot, IconUserCheck, IconChartBar } from "@tabler/icons-react";
import PageShell from "../components/layout/PageShell";
import PageHero from "../components/layout/PageHero";
import SectionHeading from "../components/layout/SectionHeading";
import Button from "../components/ui/Button";
import PlanCard from "../components/ui/PlanCard";

const steps = [
  { icon: IconBook2, title: "Learns your business", description: "Reads your website and drafts what it knows: services, prices, areas and hours. You check it before it goes live." },
  { icon: IconMessageChatbot, title: "Answers every visitor", description: "Replies in seconds, day or night, from your own information, and asks the questions you'd ask." },
  { icon: IconUserCheck, title: "Captures the enquiry", description: "When a visitor is ready, it takes their details in the chat and emails you with a summary and an intent score." },
  { icon: IconChartBar, title: "Shows you the results", description: "Your dashboard has every conversation and lead, and what came in while you were closed." },
];

const plans = [
  {
    key: "starter",
    name: "Starter",
    price: "R599",
    note: "Up to 250 chats a month",
    features: ["One website", "Answers from your website, any hour", "Lead capture with summaries and scores", "Lead alerts by email", "Your dashboard of chats and leads", "Your colours, icon and button label"],
  },
  {
    key: "growth",
    name: "Growth",
    price: "R1,299",
    note: "Up to 1,000 chats a month",
    features: ["Everything in Starter", "Bookings in the chat, through Cal.com", "Quote request forms", "Weekly results email"],
    highlighted: true,
  },
];

const TRIAL_URL = "/contact-us?topic=concierge-trial";

const Concierge = () => {
  return (
    <PageShell>
      <Helmet>
        <title>Concierge: an AI website assistant that turns visitors into enquiries | Virtara</title>
        <meta
          name="description"
          content="Concierge by Virtara learns your business from your website, answers visitors day and night, and sends you every enquiry with a summary and a score. From R599 a month."
        />
        <link rel="canonical" href="https://virtara.co.za/concierge" />
      </Helmet>

      <PageHero
        announcement={{ label: "New from Virtara" }}
        title="A website assistant that turns visitors into enquiries."
        lead="Concierge learns your business from your website, answers visitors at any hour, and hands you every enquiry with a summary and a score."
        actions={
          <>
            <Button to={TRIAL_URL} size="lg" className="font-semibold">Start free for 14 days</Button>
            <Button onClick={() => window.concierge?.("open")} variant="secondary" size="lg">Try it on this page</Button>
          </>
        }
      />

      <section aria-label="How it works">
        <div className="shell">
          <ul className="grid divide-y divide-edge border-y border-edge sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {steps.map(({ icon: Icon, title, description }) => (
              <li key={title} className="py-7 sm:px-6 lg:first:pl-0 lg:last:pr-0">
                <Icon size={20} stroke={1.6} aria-hidden="true" className="text-frost" />
                <h2 className="mt-4 text-feature text-cloud">{title}</h2>
                <p className="mt-1.5 text-nav font-normal leading-relaxed text-mist">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plans" className="section scroll-mt-20" aria-labelledby="plans-heading">
        <div className="shell">
          <SectionHeading
            id="plans-heading"
            title="Plans"
            lead="Priced by how many chats your website gets each month. Every plan includes the assistant, lead capture and your dashboard."
          />
          <div className="mt-10 grid gap-4 lg:max-w-4xl lg:grid-cols-2">
            {plans.map((p) => (
              <PlanCard
                key={p.key}
                name={p.name}
                price={p.price}
                suffix="/month"
                note={p.note}
                features={p.features}
                highlighted={p.highlighted}
                badge="Recommended"
                cta="Start free for 14 days"
                to={TRIAL_URL}
              />
            ))}
          </div>
          <p className="mt-6 text-nav font-normal text-mist">
            Busier website, or want us to set it up and run it for you?{" "}
            <a href="/contact-us" className="text-signal-soft underline-offset-4 hover:underline">
              Talk to us about a done-for-you plan
            </a>
            .
          </p>
        </div>
      </section>

      <section id="trial" className="section scroll-mt-20 pt-0" aria-labelledby="trial-heading">
        <div className="shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <SectionHeading
            id="trial-heading"
            title="We set it up for you, free for 14 days"
            lead="Tell us about your website and we'll set Concierge up on it for you."
          />
          <div>
            <Button to={TRIAL_URL} size="lg" className="font-semibold">Start free for 14 days</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Concierge;
