import ThankYouPage from '../../../components/layout/ThankYouPage';

const SeoThankYou = () => (
  <ThankYouPage
    metaTitle="Thank You | SEO Services | Virtara"
    metaDescription="Thank you for choosing our SEO services. We'll be in touch within 24 hours to discuss your strategy."
    canonical="https://virtara.co.za/seo/thank-you"
    lead="We're excited to help you improve your search rankings and drive more organic traffic to your website."
    waitCopy="Learn more about how SEO can transform your business."
    steps={[
      { title: "Schedule your strategy call", description: "We'll be reaching out within 24 hours to schedule your free SEO strategy call." },
      { title: "Initial SEO audit", description: "Our team will conduct a preliminary analysis of your website's current SEO status." },
      { title: "Custom strategy", description: "We'll prepare a tailored SEO strategy based on your business goals and market analysis." },
    ]}
    resources={[
      { label: "SEO guide", to: "/web-development-blog" },
      { label: "Success stories", to: "/our-work" },
    ]}
  />
);

export default SeoThankYou;
