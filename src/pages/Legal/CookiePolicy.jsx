import LegalPage from '../../components/layout/LegalPage';

const CookiePolicy = () => {
  const sections = [
    {
      title: "1. What Are Cookies",
      content: "Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site."
    },
    {
      title: "2. Types of Cookies We Use",
      subsections: [
        {
          subtitle: "Essential Cookies",
          content: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility."
        },
        {
          subtitle: "Analytics Cookies",
          content: "We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's functionality and content."
        },
        {
          subtitle: "Marketing Cookies",
          content: "These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad."
        },
        {
          subtitle: "Preference Cookies",
          content: "These cookies remember your preferences and settings to enhance your experience on future visits."
        }
      ]
    },
    {
      title: "3. Third-Party Cookies",
      content: "Some of our pages display content from external providers, such as YouTube, Facebook, and Twitter. To view this third-party content, you first have to accept their specific terms and conditions. This includes their cookie policies, which we have no control over."
    },
    {
      title: "4. Managing Cookies",
      content: "Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of the site. To learn more about cookies and how to manage them, visit www.aboutcookies.org."
    },
    {
      title: "5. Your Consent",
      content: "When you first visit our site, we'll ask for your consent to use cookies. You can change your mind at any time by clicking on the 'Cookie Settings' button in our website footer."
    }
  ];

  return (
    <LegalPage
      metaTitle="Cookie Policy | Virtara"
      metaDescription="Learn how Virtara uses cookies and similar technologies, including analytics and preference settings."
      canonical="https://virtara.co.za/legal/cookie-policy"
      path="/legal/cookie-policy"
      title="Cookie policy"
      lead="This policy explains how we use cookies and similar technologies to recognise you when you visit our website."
      footer={
        <>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">For any questions regarding our cookie policy, please <a href="/contact-us" className="text-link">contact us</a>.</p>
        </>
      }
    >
      {sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.subsections ? (
            section.subsections.map((sub) => (
              <div key={sub.subtitle}>
                <h3>{sub.subtitle}</h3>
                <p>{sub.content}</p>
              </div>
            ))
          ) : (
            <p>{section.content}</p>
          )}
        </section>
      ))}
    </LegalPage>
  );
};

export default CookiePolicy;
