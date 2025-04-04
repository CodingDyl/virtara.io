import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#161616] border-t border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-white/70 text-sm md:text-base">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              <Link to="/legal/cookie-policy" className="text-[#00f2fe] hover:text-[#ff00e5] ml-1 transition-colors">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={declineCookies}
              className="px-4 py-2 bg-transparent text-white border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Decline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={acceptCookies}
              className="px-4 py-2 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Accept
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieConsent;