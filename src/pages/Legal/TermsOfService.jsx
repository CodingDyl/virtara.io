import LegalPage from '../../components/layout/LegalPage';

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Services Description",
      content: "We provide web design, development, digital marketing, and brand strategy services. This includes but is not limited to custom website design, e-commerce solutions, AI-powered features, SEO, social media marketing, and email marketing services."
    },
    {
      title: "3. Client Responsibilities",
      content: "Clients are responsible for providing necessary materials, feedback, and approvals in a timely manner. Delays in providing required information may impact project timelines."
    },
    {
      title: "4. Payment Terms",
      content: "Payment terms vary based on the selected service package. Specific payment schedules will be outlined in individual service agreements. We reserve the right to pause services for overdue accounts."
    },
    {
      title: "5. Intellectual Property",
      content: "Upon full payment, clients receive ownership rights to the final deliverables. We retain rights to showcase the work in our portfolio unless otherwise agreed upon in writing."
    },
    {
      title: "6. Confidentiality",
      content: "We maintain strict confidentiality regarding client information and project details. Any sensitive information shared will be used solely for project purposes."
    },
    {
      title: "7. Project Timeline",
      content: "Project timelines are estimates and may vary based on project complexity and client responsiveness. We will communicate any significant timeline changes promptly."
    },
    {
      title: "8. Termination",
      content: "Either party may terminate services with written notice. Clients are responsible for payment of work completed up to the termination date."
    }
  ];

  return (
    <LegalPage
      metaTitle="Terms of Service | Virtara"
      metaDescription="Read Virtara's terms of service covering project scope, payments, intellectual property, confidentiality, and termination."
      canonical="https://virtara.co.za/legal/terms-of-service"
      path="/legal/terms-of-service"
      title="Terms of service"
      lead="Please read these terms carefully before using our services. These terms establish the rules and regulations for the use of our services."
      footer={
        <>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">For any questions regarding these terms, please <a href="/contact-us" className="text-link">contact us</a>.</p>
        </>
      }
    >
      {sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
    </LegalPage>
  );
};

export default TermsOfService;
