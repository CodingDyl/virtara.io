import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const ComeBack = () => {
  return (
    <>
      <Helmet>
        <title>See You Soon | Virtara Newsletter</title>
        <meta name="description" content="Thank you for being part of Virtara's newsletter community" />
        <link rel="canonical" href="https://virtara.co.za/comeback" />
      </Helmet>
      <div className="bg-[#0F0F0F] min-h-screen">
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-8 flex justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <FaHeart className="text-[#ff00e5] w-16 h-16" />
                  </motion.div>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  Until We Meet Again!
                </h2>
                <p className="text-lg text-white/70 mb-8">
                  You've been successfully unsubscribed from our newsletter. We appreciate the time 
                  you spent with us and hope our paths cross again in the future. Remember, our 
                  door is always open if you'd like to return!
                </p>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Return to Homepage
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ComeBack;
