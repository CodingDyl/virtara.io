import React from 'react';
import { motion } from "framer-motion";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const AuditThankYou = () => {
  return (
    <div className="bg-[#050910] min-h-screen">
      <Helmet>
        <title>Thank You | Website Audit Booking | Virtara</title>
        <meta name="description" content="Thank you for booking your website audit session with Virtara. We'll be in touch shortly to confirm your appointment." />
      </Helmet>

      <Navbar />
      
      <section className="min-h-screen pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                Thank You for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                  {" "}Booking
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                We've received your audit booking request and we'll be in touch shortly to confirm your appointment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">What's Next?</h2>
              <div className="space-y-4 text-white/70 mb-8">
                <p>1. You'll receive a confirmation email shortly</p>
                <p>2. We'll review your website details before the session</p>
                <p>3. We'll meet at your scheduled time to discuss your website</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white text-black rounded-full font-medium flex items-center gap-2 hover:bg-white/90 transition-colors w-full sm:w-auto justify-center"
                  >
                    Back to Home
                    <FaArrowRight />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
                  >
                    Contact Support
                    <FaArrowRight />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuditThankYou;