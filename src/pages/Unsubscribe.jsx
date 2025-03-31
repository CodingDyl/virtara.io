import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Unsubscribe = () => {
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from URL parameters if present
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      
      const result = await unsubscribeFromNewsletter(email);
      
      if (result.success) {
        setIsUnsubscribed(true);
        toast.success(result.message);
        navigate('/comeback');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to unsubscribe. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Unsubscribe | Virtara Newsletter</title>
        <meta name="description" content="Unsubscribe from Virtara's newsletter" />
        <link rel="canonical" href="https://virtara.co.za/unsubscribe" />
      </Helmet>
      <Toaster position="top-right" />
      <div className="bg-[#0F0F0F] min-h-screen">

        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              {!isUnsubscribed ? (
                <>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                    We're Sad to See You Go
                  </h1>
                  <p className="text-lg text-white/70 mb-8">
                    Before you unsubscribe, know that we've valued having you as part of our community. You'll be missed!
                  </p>
                  <form onSubmit={handleUnsubscribe} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Confirm your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white focus:border-[#00f2fe] focus:outline-none"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                      >
                        Unsubscribe
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
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
                  <h2 className="text-3xl font-bold text-white mb-4">
                    You've Been Unsubscribed
                  </h2>
                  <p className="text-white/70 mb-8">
                    We're sorry to see you go. You can always resubscribe if you change your mind.
                    We'll keep creating amazing content in case you want to come back!
                  </p>
                  <motion.a
                    href="/"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block px-8 py-3 bg-white/5 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                  >
                    Return Home
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Unsubscribe;
