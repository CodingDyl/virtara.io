import ThankYouPage from '../../../../components/layout/ThankYouPage';

const StarterThankYou = () => (
  <ThankYouPage
    metaTitle="Thank You | Starter Package | Virtara"
    metaDescription="Thank you for choosing our Starter Website Package. We'll be in touch within 24 hours to discuss your project."
    canonical="https://virtara.co.za/web-development/starter/thank-you"
    lead="We're excited to help you bring your vision to life with our Starter Website Package."
    waitCopy="Learn more about our web development process."
    steps={[
  { title: "Schedule your consultation", description: "We'll be reaching out within 24 hours to schedule your free project consultation." },
  { title: "Project planning", description: "Our team will analyse your requirements and create a detailed project roadmap." },
  { title: "Design & development", description: "We'll start building your website with regular updates and feedback sessions." },
]}
    resources={[{ label: "Our process", to: "/services" }, { label: "Portfolio", to: "/our-work" }]}
  />
);

export default StarterThankYou;
