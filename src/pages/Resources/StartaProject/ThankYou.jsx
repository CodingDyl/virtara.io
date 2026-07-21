import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { subscribeToNewsletter } from '../../../config/firebase';

const ThankYou = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleHealthCheckSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await subscribeToNewsletter(formData.email, formData.name);
      
      const response = await fetch('https://virtara-backend.vercel.app/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Subscription failed');
      
      setIsSuccess(true);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050910] min-h-screen">
      <Helmet>
        <title>Thank You | Virtara</title>
        <meta name="description" content="Thank you for reaching out. While you wait, discover how to optimize your website's conversion rate with our free checklist." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://virtara.co.za/resources/start-a-project/thank-you" />
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
                Thank You for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]"> Choosing Us</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                We'll be in touch within 24 hours to discuss your project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                While You Wait, Optimize Your Current Website
              </h2>
              <p className="text-white/70 mb-6">
                Get our free Website Conversion Checklist and discover quick wins to improve your website's performance immediately.
              </p>

              {!isSuccess ? (
                <form onSubmit={handleHealthCheckSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8df6ff]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8df6ff]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Get Free Checklist
                        <FaArrowRight />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="text-white text-center p-4">
                  Check your email for your free checklist!
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
                <a href="mailto:info@virtara.co.za" className="text-[#8df6ff] hover:underline">
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

export default ThankYou;
