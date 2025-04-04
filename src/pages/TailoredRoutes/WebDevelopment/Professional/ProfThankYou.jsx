import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { subscribeToNewsletter } from '../../../../config/firebase';

const ProfThankYou = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await subscribeToNewsletter(formData.email, formData.name, false);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Helmet>
        <title>Thank You - Professional Package | Virtara</title>
        <meta name="description" content="Thank you for choosing our Professional Package. While you wait, get our comprehensive conversion optimization guide." />
      </Helmet>

      <Navbar />

      <section className="min-h-screen pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                Ready to Transform Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]"> Online Presence</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Thanks for choosing our Professional Package. Our team will contact you within 24 hours to discuss your vision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Maximize Your Website's Potential
              </h2>
              <p className="text-white/70 mb-6">
                Get our "Professional Website Optimization Guide" with advanced strategies for conversion, SEO, and user engagement.
              </p>

              {!isSuccess ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Get Free Guide
                        <FaArrowRight />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="text-white text-center p-4">
                  Check your email for your optimization guide!
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-white/70">
                Have questions? Email us at{' '}
                <a href="mailto:info@virtara.co.za" className="text-[#00f2fe] hover:underline">
                  info@virtara.co.za
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfThankYou;
