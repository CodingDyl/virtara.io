import {
  IconCalendarEvent,
  IconAdjustmentsHorizontal,
  IconMessages,
  IconMail,
  IconPhone,
  IconBuilding,
  IconWorld,
} from "@tabler/icons-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notifications/notification";
import sendEmail from "../server/workflow";
import PageShell from "../components/layout/PageShell";
import PageHero from "../components/layout/PageHero";
import Button from "../components/ui/Button";
import { IconInput } from "../components/ui/Field";
import { cn } from "../utils/cn";

/** A single-choice chip group that still takes part in native form validation. */
const ChoiceGroup = ({ label, name, options, value, onChange }) => (
  <fieldset>
    <legend className="field-label">{label}</legend>
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const on = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-pill border px-3.5 py-2 text-nav font-normal transition-colors duration-fast",
              on
                ? "border-signal/60 bg-signal/15 text-cloud"
                : "border-edge bg-ink text-mist hover:border-edge-strong hover:text-frost"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={() => {}}
      required
      className="pointer-events-none absolute h-px w-px opacity-0"
      aria-hidden="true"
      tabIndex={-1}
    />
  </fieldset>
);

function StartaProject() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget: "",
    service: "",
    message: ""
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      budget: "",
      service: "",
      message: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendEmail(
        `Start a Project Request: ${formData.service || "General Inquiry"}`,
        `
        Name: ${formData.name}, <br />
        Email: ${formData.email}, <br />
        Phone: ${formData.phone}, <br />
        Company: ${formData.company}, <br />
        Website: ${formData.website}, <br />
        Budget: ${formData.budget}, <br />
        Service: ${formData.service}, <br />
        Message: ${formData.message}
      `
      );

      resetForm();
      setNotification({
        message: "Email sent successfully!",
        type: "success",
        isVisible: true
      });
      navigate("/resources/start-a-project/thank-you");
    } catch (error) {
      console.error(error);
      setNotification({
        message: "Failed to send email. Please try again later.",
        type: "error",
        isVisible: true
      });
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      category: "Web Development",
      options: ["Custom Website Design", "E-Commerce Solutions", "Web Application Development", "Website Maintenance"]
    },
    {
      category: "Digital Marketing",
      options: ["Search Engine Optimization", "Social Media Marketing", "Paid Advertising", "Email Marketing"]
    },
    {
      category: "Brand Strategy",
      options: ["Brand Identity Design", "Brand Guidelines", "Brand Messaging", "Visual Identity"]
    }
  ];

  const projectSizes = [
    "Starter (R8,000 - R25,000)",
    "Growth (R25,000 - R65,000)",
    "Scale (R65,000 - R150,000)",
    "Enterprise (R150,000+)"
  ];

  const benefits = [
    {
      icon: IconCalendarEvent,
      title: "Fast discovery",
      description: "A practical strategy call focused on revenue opportunities and implementation speed."
    },
    {
      icon: IconAdjustmentsHorizontal,
      title: "Tailored scope",
      description: "No one-size package. We scope around outcomes, team capacity, and budget reality."
    },
    {
      icon: IconMessages,
      title: "Direct communication",
      description: "Direct access to your strategist with transparent milestones from day one."
    }
  ];

  const timeline = ["Submit strategic brief", "45-minute discovery call", "Growth roadmap + proposal"];

  const serviceOptions = services.flatMap((group) => group.options);

  return (
    <PageShell>
      <Helmet>
        <title>Start Your Digital Project | Web Development & Marketing Solutions</title>
        <meta
          name="description"
          content="Ready to start your digital project? Let's collaborate to create innovative web solutions and marketing strategies that drive results for your business."
        />
        <meta
          name="keywords"
          content="start project, web development project, digital marketing services, custom solutions"
        />
        <link rel="canonical" href="https://virtara.co.za/start-your-project" />
      </Helmet>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />

      <PageHero
        announcement={{ label: "Strategy-led project intake" }}
        title="Start a project built for measurable growth."
        lead="Tell us what you want to achieve and we'll map the highest-leverage roadmap for your next phase. This is a consultation, not a generic quote form."
      />

      <section className="pb-24 md:pb-32" aria-label="Project brief">
        <div className="shell grid items-start gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          {/* What happens next */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-card border border-edge bg-ink p-6">
              <h2 className="text-feature text-cloud">What happens next</h2>
              <ul className="mt-5 space-y-5">
                {benefits.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-edge bg-steel text-frost">
                      <Icon size={17} stroke={1.6} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-nav font-semibold text-cloud">{title}</span>
                      <span className="mt-0.5 block text-nav font-normal leading-relaxed text-mist">{description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-edge bg-ink p-6">
              <h2 className="text-nav font-medium text-frost">Typical timeline</h2>
              <ol className="mt-4 space-y-0">
                {timeline.map((step, i) => (
                  <li key={step} className="relative flex gap-3 pb-4 last:pb-0">
                    {i < timeline.length - 1 && (
                      <span aria-hidden="true" className="absolute left-[9px] top-6 h-[calc(100%-16px)] w-px bg-edge" />
                    )}
                    <span className="figure flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-signal/40 bg-signal/10 text-[11px] text-cloud">
                      {i + 1}
                    </span>
                    <span className="text-nav font-normal text-mist">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-edge pt-4 text-nav font-normal leading-relaxed text-mist">
                Most clients begin with a focused sprint and scale into monthly optimisation once baseline wins are proven.
                <span className="mt-2 block text-frost">Average response time: under 24 hours.</span>
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-card border border-edge bg-charcoal shadow-frame">
            <div className="border-b border-edge px-6 py-5 sm:px-8">
              <h2 className="text-title text-cloud">Book your strategy audit</h2>
              <p className="mt-1 text-nav font-normal text-mist">
                Share your context below and we'll reply with next steps and a fit-for-purpose plan.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="p-name" className="field-label">Full name *</label>
                  <input id="p-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" className="field-input" required />
                </div>
                <div>
                  <label htmlFor="p-email" className="field-label">Email address *</label>
                  <IconInput icon={IconMail} id="p-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.co.za" required />
                </div>
                <div>
                  <label htmlFor="p-phone" className="field-label">Phone number</label>
                  <IconInput icon={IconPhone} id="p-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleInputChange} placeholder="+27 12 345 6789" />
                </div>
                <div>
                  <label htmlFor="p-company" className="field-label">Company name</label>
                  <IconInput icon={IconBuilding} id="p-company" type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleInputChange} placeholder="Your company" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="p-website" className="field-label">Website (if existing)</label>
                  <IconInput icon={IconWorld} id="p-website" type="url" name="website" autoComplete="url" value={formData.website} onChange={handleInputChange} placeholder="https://yourwebsite.co.za" />
                </div>
              </div>

              <div className="relative">
                <ChoiceGroup
                  label="Project budget range *"
                  name="budget"
                  options={projectSizes}
                  value={formData.budget}
                  onChange={(budget) => setFormData((prev) => ({ ...prev, budget }))}
                />
              </div>

              <div className="relative">
                <ChoiceGroup
                  label="Primary service *"
                  name="service"
                  options={serviceOptions}
                  value={formData.service}
                  onChange={(service) => setFormData((prev) => ({ ...prev, service }))}
                />
              </div>

              <div>
                <label htmlFor="p-message" className="field-label">Project details *</label>
                <textarea
                  id="p-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What outcomes do you want in the next 3–6 months? Include your goals, timeline and priorities."
                  rows="6"
                  className="field-input resize-y"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-edge pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-caption font-normal text-quiet">
                  By submitting, you agree to be contacted regarding your strategy request.
                </p>
                <Button type="submit" size="lg" loading={isSubmitting} showArrow className="font-semibold">
                  {isSubmitting ? "Sending…" : "Book a strategy audit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default StartaProject;
