import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { healthCheckPreview } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { subscribeToNewsletter } from '../../../config/firebase';

const Checklist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, update Firestore through the subscribeToNewsletter function
      const subscriptionResult = await subscribeToNewsletter(formData.email, formData.name, false);
      
      if (!subscriptionResult.success) {
        throw new Error(subscriptionResult.message);
      }

      // Then call the existing subscribe API endpoint
      const response = await fetch('https://virtara-backend.vercel.app/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      const data = await response.json();
      console.log(data);
      
      // Show success state
      setIsSuccess(true);

      // Wait a moment to ensure the download starts
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to thank you page
      navigate('/thank-you');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setIsSuccess(false);
      // You might want to add error state handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Website Conversion Checklist | Virtara</title>
        <meta name="description" content="Download our free website conversion checklist to discover why your website isn't converting and how to fix it. Quick 5-minute assessment to boost your conversion rates." />
        <meta name="keywords" content="website conversion, conversion checklist, conversion optimization, website optimization" />
        <link rel="canonical" href="https://www.virtara.co.za/resources/health-check" />
      </Helmet>

      <div className="bg-[#050910] min-h-screen">
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
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                  Discover Why Your Website Isn't
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                    {" "}Converting
                  </span>
                </h1>
                <p className="text-xl text-white/70 mb-8">
                  Takes 5 minutes. Spots leaks. Saves customers.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Form Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10"
                >
                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-white mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8df6ff]"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8df6ff]"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          <>
                            Get My Free Checklist
                            <FaArrowRight />
                          </>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                      <p className="text-white/70">
                        Check your email for your free checklist.
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  {/* Replace with your actual checklist mockup image */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#8df6ff]/20 to-[#4ea4ff]/20 rounded-2xl border border-white/10 p-8 flex items-center justify-center">
                    <img src={healthCheckPreview} alt="Checklist Preview" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </motion.div>
              </div>

              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 text-center"
              >
                <h2 className="text-2xl font-bold text-white mb-8">What You'll Discover:</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    "Common conversion killers",
                    "Quick-win optimization tips",
                    "Expert conversion strategies"
                  ].map((benefit, index) => (
                    <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-white/70">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Checklist;
