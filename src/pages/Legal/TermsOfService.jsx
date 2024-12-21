import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
              Terms of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Service
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-12">
              Please read these terms carefully before using our services. These terms establish the rules and regulations for the use of our services.
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
                  <p className="text-white/70">{section.content}</p>
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
                For any questions regarding these terms, please contact us.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;