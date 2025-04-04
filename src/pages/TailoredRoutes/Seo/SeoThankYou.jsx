import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaCalendarAlt, FaFileAlt, FaChartLine } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';

const SeoThankYou = () => {
  const nextSteps = [
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: "Schedule Your Strategy Call",
      description: "We'll be reaching out within 24 hours to schedule your free SEO strategy call."
    },
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "Initial SEO Audit",
      description: "Our team will conduct a preliminary analysis of your website's current SEO status."
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Custom Strategy",
      description: "We'll prepare a tailored SEO strategy based on your business goals and market analysis."
    }
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Success Message */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <FaCheckCircle className="w-20 h-20 mx-auto text-[#00f2fe]" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Thank You for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Choosing Us!
              </span>
            </h1>
            
            <p className="text-lg text-white/70 mb-12">
              We're excited to help you improve your search rankings and drive more organic traffic to your website.
            </p>

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 p-6 rounded-xl"
                >
                  <div className="text-[#00f2fe] mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-white/5 p-8 rounded-xl mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                While You Wait
              </h2>
              <p className="text-white/70 mb-6">
                Check out these resources to learn more about how SEO can transform your business:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/blog/seo-guide"
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  SEO Guide
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/case-studies"
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  Success Stories
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Return to Home */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#00f2fe] hover:text-[#ff00e5] transition-colors"
            >
              Return to Homepage
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeoThankYou; 