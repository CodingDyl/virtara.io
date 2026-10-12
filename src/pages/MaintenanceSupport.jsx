import { IconShieldCheck, IconGauge, IconTool, IconChartLine } from '@tabler/icons-react';
import { Helmet } from 'react-helmet-async';
import PageShell from '../components/layout/PageShell';
import PageHero from '../components/layout/PageHero';
import SectionHeading from '../components/layout/SectionHeading';
import ClosingBand from '../components/layout/ClosingBand';
import Button from '../components/ui/Button';
import PlanCard from '../components/ui/PlanCard';

const MaintenanceSupport = () => {
  const maintenanceServices = [
    {
      icon: IconShieldCheck,
      title: "Security & Updates",
      description: "Regular updates and security monitoring to keep your site protected."
    },
    {
      icon: IconGauge,
      title: "Performance",
      description: "Optimization and monitoring to ensure peak site performance."
    },
    {
      icon: IconTool,
      title: "Technical Support",
      description: "Expert assistance for any technical issues or requirements."
    },
    {
      icon: IconChartLine,
      title: "Growth Support",
      description: "Proactive improvements and feature development as needed."
    }
  ];

  const plans = [
    {
      title: "Essential Maintenance",
      price: "R1,000",
      features: [
        "Monthly CMS & Plugin Updates",
        "Weekly Secure Backups",
        "Basic Malware Scans",
        "Uptime Monitoring",
        "48-hour Email Support"
      ]
    },
    {
      title: "Pro Maintenance",
      price: "R2,500",
      features: [
        "All Essential Features",
        "Performance Optimization",
        "2 Hours Content Updates",
        "Advanced Security Scans",
        "24-hour Priority Support",
        "Monthly Analytics Review"
      ],
      highlighted: true
    },
    {
      title: "Premium Maintenance",
      price: "R5,000",
      features: [
        "All Pro Features",
        "5 Hours Custom Development",
        "E-Commerce Support",
        "Proactive Improvements",
        "2-Hour Downtime Response",
        "Dedicated Account Manager"
      ]
    }
  ];

  return (
    <PageShell>
      <Helmet>
        <title>Website Maintenance & Support Services | Professional Site Care</title>
        <meta name="description" content="Keep your website secure, fast, and up-to-date with our professional maintenance and support services. Choose from three comprehensive care plans." />
        <meta name="keywords" content="website maintenance, website support, security updates, performance optimization, technical support" />
        <link rel="canonical" href="https://virtara.co.za/maintenance-support" />
      </Helmet>

      <PageHero
        announcement={{ label: 'Site care plans' }}
        title="Website maintenance, handled."
        lead="Keep your website secure, optimised and running smoothly with a care plan sized to your business."
        actions={
          <>
            <Button href="#plans" size="lg" className="font-semibold">See plans</Button>
            <Button to="/contact-us" variant="secondary" size="lg">Talk to the team</Button>
          </>
        }
      />

      <section aria-label="What's covered">
        <div className="shell">
          <ul className="grid divide-y divide-edge border-y border-edge sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {maintenanceServices.map(({ icon: Icon, title, description }) => (
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
          <SectionHeading id="plans-heading" title="Plans" />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.title}
                name={plan.title}
                price={plan.price}
                suffix="/month"
                features={plan.features}
                highlighted={plan.highlighted}
                badge="Most popular"
                cta="Get started"
                to="/contact-us"
              />
            ))}
          </div>
        </div>
      </section>

      <ClosingBand
        title="Ready to keep your site in perfect shape?"
        actions={
          <Button to="/contact-us" size="lg" className="font-semibold" showArrow>Get started now</Button>
        }
      />
    </PageShell>
  );
};

export default MaintenanceSupport;
