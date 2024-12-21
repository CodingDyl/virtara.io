import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Cookie
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Policy
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-12">
              This policy explains how we use cookies and similar technologies to recognize you when you visit our website.
            </p>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h2 className="text-white text-xl font-semibold mb-4">{section.title}</h2>
                  {section.subsections ? (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h3 className="text-[#00f2fe] font-medium mb-2">{subsection.subtitle}</h3>
                          <p className="text-white/70">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70">{section.content}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-white/70 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-white/70">
                For any questions regarding our cookie policy, please contact us.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;