import { IconMail, IconBuilding, IconArrowLeft, IconCheck } from '@tabler/icons-react';
import { IconInput, SelectField as Select, CheckboxCard as Checkbox } from '../../../../components/ui/Field';
import { Link } from 'react-router-dom';
import { formIndustries, formWebsiteGoals, formPriorities } from '../../../../constants';
import Button from '../../../../components/ui/Button';

const packageFeatures = {
  starter: ["Custom Design", "Mobile Responsive", "4 Pages", "Contact Form", "Basic SEO"],
  professional: [
    "Everything in Starter",
    "E-Commerce Integration",
    "10 Pages",
    "CMS Integration",
    "Advanced SEO",
    "Social Media Integration"
  ],
  enterprise: [
    "Everything in Professional",
    "Custom Functionality",
    "Unlimited Pages",
    "AI Integration",
    "Priority Support",
    "Analytics Dashboard"
  ]
};

const tierBlurb = {
  Starter: 'Ideal for small businesses and startups looking to establish a professional online presence.',
  Professional: 'Perfect for businesses requiring advanced functionality and custom features.',
  Enterprise: 'Ideal for large-scale projects with complex requirements and custom solutions.'
};

const WebDevForm = ({
  tier,
  formData,
  handleInputChange,
  handleSubmit,
  additionalFields = [],
  isSubmitting = false
}) => {
  const getTierData = (dataObject) => dataObject[tier.toLowerCase()] || dataObject.starter;
  const features = packageFeatures[tier.toLowerCase()] ?? packageFeatures.starter;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-pill border border-edge bg-ink py-1.5 pl-3 pr-3.5 text-nav text-mist">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--v-signal))]" />
          {tier} package
        </p>
        <h1 className="text-display text-cloud">Let's build something exceptional.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lead text-frost">
          Tell us about your vision, and we'll create a powerful digital solution.
        </p>
      </div>

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        {/* Selected package */}
        <aside className="rounded-card border border-edge bg-ink p-6 lg:sticky lg:top-24">
          <p className="text-caption text-quiet">Selected package</p>
          <h2 className="mt-1 text-title text-cloud">{tier} website</h2>
          <p className="mt-2 text-nav font-normal leading-relaxed text-mist">{tierBlurb[tier] ?? tierBlurb.Starter}</p>
          <ul className="mt-5 space-y-2.5 border-t border-edge pt-5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-nav font-normal text-frost">
                <IconCheck size={16} stroke={2} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-1.5 text-nav text-mist transition-colors duration-fast hover:text-cloud"
          >
            <IconArrowLeft size={15} stroke={1.8} aria-hidden="true" />
            Choose a different package
          </Link>
        </aside>

        {/* Form */}
        <div className="rounded-card border border-edge bg-charcoal shadow-frame">
          <div className="border-b border-edge px-6 py-5 sm:px-8">
            <h2 className="text-title text-cloud">Project details</h2>
            <p className="mt-1 text-nav font-normal text-mist">Tell us about your project and we'll get back to you within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="wd-name" className="field-label">Full name *</label>
                <input id="wd-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" className="field-input" required />
              </div>
              <div>
                <label htmlFor="wd-email" className="field-label">Email address *</label>
                <IconInput icon={IconMail} id="wd-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.co.za" required />
              </div>
              <div>
                <label htmlFor="wd-business" className="field-label">Business name *</label>
                <IconInput icon={IconBuilding} id="wd-business" type="text" name="businessName" autoComplete="organization" value={formData.businessName} onChange={handleInputChange} placeholder="Your business name" required />
              </div>
              <Select id="wd-industry" label="Industry *" name="industry" value={formData.industry} onChange={handleInputChange} options={getTierData(formIndustries)} placeholder="Select industry" />
              <Select id="wd-goal" label="Website goal *" name="websiteGoal" value={formData.websiteGoal} onChange={handleInputChange} options={getTierData(formWebsiteGoals)} placeholder="Select goal" />
              <Select id="wd-priority" label="Main priority *" name="mainPriority" value={formData.mainPriority} onChange={handleInputChange} options={getTierData(formPriorities)} placeholder="Select priority" />
            </div>

            {additionalFields}

            <fieldset>
              <legend className="field-label">Additional services</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                <Checkbox name="seoOptimization" checked={formData.seoOptimization} onChange={handleInputChange}>SEO optimisation</Checkbox>
                <Checkbox name="contentWriting" checked={formData.contentWriting} onChange={handleInputChange}>Content writing</Checkbox>
                <Checkbox name="maintenance" checked={formData.maintenance} onChange={handleInputChange}>Ongoing maintenance</Checkbox>
              </div>
            </fieldset>

            <div className="flex flex-col-reverse gap-3 border-t border-edge pt-6 sm:flex-row sm:justify-end">
              <Button variant="secondary" size="lg" onClick={() => window.history.back()}>
                Go back
              </Button>
              <Button type="submit" size="lg" loading={isSubmitting} showArrow className="font-semibold">
                {isSubmitting ? 'Submitting…' : 'Submit & book a call'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebDevForm;
