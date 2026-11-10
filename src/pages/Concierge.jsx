import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IconBook2, IconMessageChatbot, IconUserCheck, IconChartBar } from "@tabler/icons-react";
import PageShell from "../components/layout/PageShell";
import PageHero from "../components/layout/PageHero";
import SectionHeading from "../components/layout/SectionHeading";
import Button from "../components/ui/Button";
import PlanCard from "../components/ui/PlanCard";

/** Where Concierge runs; override with VITE_CONCIERGE_URL to point at a local copy. */
const CONCIERGE_URL = import.meta.env.VITE_CONCIERGE_URL || "https://concierge.virtara.co.za";

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
  {
    key: "pro",
    name: "Pro",
    price: "R2,499",
    note: "Up to 2,000 chats a month",
    features: ["Everything in Growth", "Priority support"],
  },
];

/** Waitlist sign-up, sent to Concierge. Shows a confirmation in place of the form. */
const Waitlist = ({ plan, onPlanChange }) => {
  const [status, setStatus] = useState({ state: "idle" });

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(["name", "email", "website", "plan"].map((k) => [k, String(form.get(k) || "")]));
    if (!body.plan) delete body.plan;
    setStatus({ state: "sending" });
    try {
      const res = await fetch(`${CONCIERGE_URL}/api/waitlist`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok ? { state: "done", email: body.email } : { state: "error", message: data.error || "That didn't send. Please try again." });
    } catch {
      setStatus({ state: "error", message: "That didn't send. Check your connection and try again." });
    }
  };

  if (status.state === "done") {
    return (
      <div role="status" className="rounded-card border border-signal/40 bg-charcoal p-6 shadow-frame md:p-8">
        <p className="text-feature text-cloud">You&rsquo;re on the list.</p>
        <p className="mt-2 text-mist">
          We&rsquo;ll email <span className="text-frost">{status.email}</span> as soon as sign-up opens. Want it sooner?{" "}
          <a href="/contact-us" className="text-signal-soft underline-offset-4 hover:underline">
            Talk to us
          </a>{" "}
          and we&rsquo;ll set it up for you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-card border border-edge bg-charcoal p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="wl-name" className="field-label">Name</label>
        <input id="wl-name" name="name" required autoComplete="name" className="field-input" />
      </div>
      <div>
        <label htmlFor="wl-email" className="field-label">Email</label>
        <input id="wl-email" name="email" type="email" required autoComplete="email" className="field-input" />
      </div>
      <div>
        <label htmlFor="wl-website" className="field-label">Website (optional)</label>
        <input id="wl-website" name="website" inputMode="url" placeholder="yourbusiness.co.za" className="field-input" />
      </div>
      <div>
        <label htmlFor="wl-plan" className="field-label">Plan</label>
        <select id="wl-plan" name="plan" value={plan} onChange={(e) => onPlanChange(e.target.value)} className="field-input [&>option]:bg-charcoal">
          <option value="">Not sure yet</option>
          {plans.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}, {p.price} a month
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center">
        <Button type="submit" size="lg" className="font-semibold" loading={status.state === "sending"}>
          Join the waitlist
        </Button>
        {status.state === "error" && (
          <p role="alert" className="text-nav text-critical">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
};

const Concierge = () => {
  const [plan, setPlan] = useState("");
  const choose = (key) => {
    setPlan(key);
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
            <Button href="#waitlist" size="lg" className="font-semibold">Join the waitlist</Button>
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
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
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
                cta="Join the waitlist"
                onClick={() => choose(p.key)}
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

      <section id="waitlist" className="section scroll-mt-20 pt-0" aria-labelledby="waitlist-heading">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading
            id="waitlist-heading"
            title="Join the waitlist"
            lead="Online sign-up opens soon. Leave your details and we'll email you the moment you can start."
          />
          <Waitlist plan={plan} onPlanChange={setPlan} />
        </div>
      </section>
    </PageShell>
  );
};

export default Concierge;
