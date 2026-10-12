import ThankYouPage from '../../../../components/layout/ThankYouPage';

const ProfThankYou = () => (
  <ThankYouPage
    metaTitle="Thank You | Professional Package | Virtara"
    metaDescription="Thank you for choosing our Professional Website Package. We'll be in touch within 24 hours to discuss your project."
    canonical="https://virtara.co.za/web-development/professional/thank-you"
    lead="We're excited to help you create a powerful digital presence with our Professional Website Package."
    waitCopy="Learn more about our web development process."
    steps={[
  { title: "Schedule your consultation", description: "We'll be reaching out within 24 hours to schedule your free project consultation." },
  { title: "Project planning", description: "Our team will analyse your requirements and create a detailed project roadmap." },
  { title: "Design & development", description: "We'll start building your website with regular updates and feedback sessions." },
]}
    resources={[{ label: "Our process", to: "/services" }, { label: "Portfolio", to: "/our-work" }]}
  />
);

export default ProfThankYou;
