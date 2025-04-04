import React from 'react';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const HealthThankYou = () => {
    const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Thank You - Website Health Check | Virtara</title>
        <meta name="description" content="Thank you for downloading our website health check. Upgrade to a personalized website audit for expert insights." />
        <meta name="robots" content="noindex" /> {/* Don't index thank you pages */}
      </Helmet>

      <div className="bg-[#0F0F0F] min-h-screen">
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
                  Thanks! Your Checklist Is on Its
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                    {" "}Way!
                  </span>
                </h1>
                <p className="text-xl text-white/70 mb-8">
                  Check your inbox for the 5-Minute Website Health Check.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Want Us to Do the Heavy Lifting?
                </h2>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#00f2fe] line-through mr-3">R499</span>
                  <span className="text-4xl font-bold text-white">R299</span>
                </div>
                <p className="text-white/70 mb-8">
                  Grab a 30-minute Website Audit and get a custom fix-it plan from our experts.
                  We'll analyze your site and show you exactly what needs to change to boost conversions.
                </p>
                <motion.a
                  onClick={() => navigate('/resources/audit')}// Replace with your actual payment link
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 hover:cursor-pointer transition-opacity"
                >
                  Claim My Audit Now
                  <FaArrowRight />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-6">What's Included:</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    "30-Minute Expert Analysis",
                    "Custom Action Plan",
                    "Priority Support"
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

export default HealthThankYou;