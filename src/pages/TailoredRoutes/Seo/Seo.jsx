import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IconSearch, IconChartLine, IconTarget, IconAward, IconMail, IconPhone, IconBuilding, IconWorld, IconCheck } from '@tabler/icons-react';
import Notification from '../../../components/Notifications/notification';
import sendEmail from "../../../server/workflow";
import PageShell from '../../../components/layout/PageShell';
import PageHero from '../../../components/layout/PageHero';
import Button from '../../../components/ui/Button';
import { IconInput, SelectField, CheckboxCard } from '../../../components/ui/Field';
import { trackEvent } from '../../../lib/analytics';
import { saveLead } from '../../../config/firebase';
import { seoPlans, aeoStarter } from '../../../data/pricing';

const Seo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    currentWebsite: '',
    targetLocation: '',
    mainCompetitors: '',
    businessGoals: '',
    currentKeywords: '',
    targetKeywords: '',
    contentCreation: false,
    localSEO: false,
    technicalSEO: false,
    linkBuilding: false,
    aeo: false
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    'Retail',
    'Services',
    'E-commerce',
    'Healthcare',
    'Education',
    'Technology',
    'Hospitality',
    'Other'
  ];

  const businessGoals = [
    'Increase Local Visibility',
    'Boost Online Sales',
    'Generate More Leads',
    'Improve Brand Awareness',
    'Outrank Competitors',
    'Other'
  ];

  const seoBenefits = [
    {
      icon: IconChartLine,
      title: "Increase Organic Traffic",
      description: "Drive more qualified visitors to your website without paid advertising"
    },
    {
      icon: IconSearch,
      title: "Better Search Visibility",
      description: "Appear in front of customers actively searching for your services"
    },
    {
      icon: IconTarget,
      title: "Targeted Audience",
      description: "Reach the right people at the right time with strategic keyword targeting"
    },
    {
      icon: IconAward,
      title: "Show up in AI answers",
      description: "Clear answers, FAQs and schema make it easier for AI assistants to find, trust and quote your business"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendEmail(
        "New SEO Service Inquiry",
        `
        SEO SERVICE INQUIRY
        <br /><br />

        Contact Information:<br />
        Name: ${formData.name}<br />
        Email: ${formData.email}<br />
        Phone: ${formData.phone}<br />
        Business Name: ${formData.businessName}<br />
        <br />

        Business Details:<br />
        Industry: ${formData.industry}<br />
        Current Website: ${formData.currentWebsite}<br />
        Target Location: ${formData.targetLocation}<br />
        Main Competitors: ${formData.mainCompetitors}<br />
        Business Goals: ${formData.businessGoals}<br />
        <br />

        SEO Requirements:<br />
        Current Keywords: ${formData.currentKeywords}<br />
        Target Keywords: ${formData.targetKeywords}<br />
        <br />

        Additional Services Requested:<br />
        - Content Creation: ${formData.contentCreation ? 'Yes' : 'No'}<br />
        - Local SEO: ${formData.localSEO ? 'Yes' : 'No'}<br />
        - Technical SEO: ${formData.technicalSEO ? 'Yes' : 'No'}<br />
        - Link Building: ${formData.linkBuilding ? 'Yes' : 'No'}<br />
        - AEO: ${formData.aeo ? 'Yes' : 'No'}<br />
        `,
        { replyTo: formData.email, name: formData.name }
      );

      saveLead({
        form: "seo",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        details: {
          businessName: formData.businessName,
          industry: formData.industry,
          currentWebsite: formData.currentWebsite,
          targetLocation: formData.targetLocation,
          businessGoals: formData.businessGoals
        }
      });
      trackEvent("generate_lead", { form: "seo" });
      setNotification({
        message: "Thanks for your interest! We'll analyze your requirements and reach out within 24 hours.",
        type: 'success',
        isVisible: true
      });

      setTimeout(() => {
        navigate('/seo/thank-you');
      }, 2000);

    } catch (error) {
      console.error(error);
      setNotification({
        message: "There was an error submitting your form. Please try again.",
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <Helmet>
        <title>SEO + AEO Services | Get Found on Google and in AI Answers | Virtara</title>
        <meta name="description" content={`SEO and answer engine optimisation (AEO) for South African businesses. Rank on Google and get named when people ask ChatGPT, Gemini or Perplexity. From ${seoPlans[0].price} a month.`} />
        <meta name="keywords" content="SEO services, search engine optimization, organic traffic, keyword ranking, local SEO, AEO, answer engine optimisation, AI search optimisation South Africa" />
        <link rel="canonical" href="https://virtara.co.za/seo" />
      </Helmet>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      <PageHero
        announcement={{ label: 'SEO + AEO services' }}
        title="Get found on Google and in AI answers."
        lead="SEO gets you ranked. Answer engine optimisation (AEO) gets you named when people ask ChatGPT, Gemini, Perplexity or Google's AI Overviews. Every Virtara SEO package now includes both."
        actions={
          <>
            <Button href="#seo-analysis" size="lg" className="font-semibold">Get your free SEO + AEO analysis</Button>
            <Button to="/services#seo" variant="secondary" size="lg">See SEO + AEO packages</Button>
          </>
        }
      />

      <section aria-label="Why SEO">
        <div className="shell">
          <ul className="grid divide-y divide-edge border-y border-edge sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {seoBenefits.map(({ icon: Icon, title, description }) => (
              <li key={title} className="py-7 sm:px-6 lg:first:pl-0 lg:last:pr-0">
                <Icon size={20} stroke={1.6} aria-hidden="true" className="text-frost" />
                <h2 className="mt-4 text-feature text-cloud">{title}</h2>
                <p className="mt-1.5 text-nav font-normal leading-relaxed text-mist">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pb-0 pt-10 md:pt-14" aria-labelledby="aeo-starter-heading">
        <div className="shell max-w-4xl">
          <div className="grid gap-8 rounded-card border border-edge bg-ink p-6 md:grid-cols-2 md:gap-10 md:p-7">
            <div className="flex flex-col">
              <h2 id="aeo-starter-heading" className="text-feature text-cloud">{aeoStarter.name}</h2>
              <p className="figure mt-5 text-[28px] leading-tight text-cloud">{aeoStarter.priceLabel}</p>
              <p className="mt-5 text-nav font-normal leading-relaxed text-mist">{aeoStarter.idealFor}</p>
              <Button href="#seo-analysis" variant="secondary" className="mt-8 w-full md:w-auto md:self-start" showArrow>Ask about AEO Starter</Button>
            </div>
            <ul className="space-y-3 border-t border-edge pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              {aeoStarter.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-nav font-normal text-frost">
                  <IconCheck size={16} stroke={2} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="seo-analysis" className="section scroll-mt-16" aria-labelledby="seo-form-heading">
        <div className="shell max-w-4xl">
          <div className="rounded-card border border-edge bg-charcoal shadow-frame">
            <div className="border-b border-edge px-6 py-5 sm:px-8">
              <h2 id="seo-form-heading" className="text-title text-cloud">Get your free SEO analysis</h2>
              <p className="mt-1 text-nav font-normal text-mist">Tell us about your business and we'll create a customised SEO strategy.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="seo-name" className="field-label">Full name *</label>
                  <input id="seo-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" className="field-input" required />
                </div>
                <div>
                  <label htmlFor="seo-email" className="field-label">Email address *</label>
                  <IconInput icon={IconMail} id="seo-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.co.za" required />
                </div>
                <div>
                  <label htmlFor="seo-phone" className="field-label">Phone or WhatsApp number</label>
                  <IconInput icon={IconPhone} id="seo-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleInputChange} placeholder="+27 12 345 6789" />
                </div>
                <div>
                  <label htmlFor="seo-business" className="field-label">Business name *</label>
                  <IconInput icon={IconBuilding} id="seo-business" type="text" name="businessName" autoComplete="organization" value={formData.businessName} onChange={handleInputChange} placeholder="Your business name" required />
                </div>
                <SelectField id="seo-industry" label="Industry *" name="industry" value={formData.industry} onChange={handleInputChange} options={industries} placeholder="Select industry" />
                <div>
                  <label htmlFor="seo-website" className="field-label">Current website URL *</label>
                  <IconInput icon={IconWorld} id="seo-website" type="url" name="currentWebsite" autoComplete="url" value={formData.currentWebsite} onChange={handleInputChange} placeholder="https://yourwebsite.co.za" required />
                </div>
                <div>
                  <label htmlFor="seo-location" className="field-label">Target location *</label>
                  <input id="seo-location" type="text" name="targetLocation" value={formData.targetLocation} onChange={handleInputChange} placeholder="City, country or global" className="field-input" required />
                </div>
                <SelectField id="seo-goal" label="Business goals" name="businessGoals" value={formData.businessGoals} onChange={handleInputChange} options={businessGoals} placeholder="Select primary goal" required={false} />
              </div>
              <div>
                <label htmlFor="seo-competitors" className="field-label">Main competitors <span className="text-quiet">(optional)</span></label>
                <textarea id="seo-competitors" name="mainCompetitors" value={formData.mainCompetitors} onChange={handleInputChange} rows="3" placeholder="List your main competitors' websites" className="field-input resize-y" />
              </div>
              <div>
                <label htmlFor="seo-keywords" className="field-label">Target keywords <span className="text-quiet">(optional)</span></label>
                <textarea id="seo-keywords" name="targetKeywords" value={formData.targetKeywords} onChange={handleInputChange} rows="3" placeholder="What keywords would you like to rank for?" className="field-input resize-y" />
              </div>
              <fieldset>
                <legend className="field-label">Additional services</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  <CheckboxCard name="contentCreation" checked={formData.contentCreation} onChange={handleInputChange}>Content creation</CheckboxCard>
                  <CheckboxCard name="localSEO" checked={formData.localSEO} onChange={handleInputChange}>Local SEO</CheckboxCard>
                  <CheckboxCard name="technicalSEO" checked={formData.technicalSEO} onChange={handleInputChange}>Technical SEO</CheckboxCard>
                  <CheckboxCard name="linkBuilding" checked={formData.linkBuilding} onChange={handleInputChange}>Link building</CheckboxCard>
                  <CheckboxCard name="aeo" checked={formData.aeo} onChange={handleInputChange}>AEO (AI search visibility)</CheckboxCard>
                </div>
              </fieldset>
              <div className="flex justify-end border-t border-edge pt-6">
                <Button type="submit" size="lg" loading={isSubmitting} showArrow className="w-full font-semibold sm:w-auto">
                  {isSubmitting ? 'Submitting…' : 'Get your free SEO analysis'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Seo;
