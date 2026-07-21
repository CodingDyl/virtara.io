import { motion } from "framer-motion";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    document.querySelector('footer')?.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.querySelector('footer')?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-[#161616] to-[#0F0F0F] text-white relative overflow-hidden">
      {/* Animated background */}
      <div
        className="pointer-events-none absolute blur-[120px] rounded-full bg-gradient-to-r from-[#8df6ff]/20 to-[#4ea4ff]/20"
        style={{
          width: '50%',
          height: '50%',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/90 to-[#0F0F0F]/90" />

      <div className="relative">
        <div className="container mx-auto px-6 py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Virtara
              </motion.h3>
              <p className="text-white/70 leading-relaxed">
                Creating digital experiences that transform businesses and inspire growth.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://x.com/Virtara_SA"
                  aria-label="Virtara on X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-gradient-to-r hover:from-[#8df6ff]/20 hover:to-[#4ea4ff]/20 transition-all duration-300 border border-white/10 hover:border-[#8df6ff]/30"
                >
                  <FaTwitter className="text-white hover:text-[#8df6ff] transition-colors duration-300" aria-hidden="true" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/company/virtara"
                  aria-label="Virtara on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-gradient-to-r hover:from-[#8df6ff]/20 hover:to-[#4ea4ff]/20 transition-all duration-300 border border-white/10 hover:border-[#8df6ff]/30"
                >
                  <FaLinkedinIn className="text-white hover:text-[#8df6ff] transition-colors duration-300" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.instagram.com/virtara.io/"
                  aria-label="Virtara on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-gradient-to-r hover:from-[#8df6ff]/20 hover:to-[#4ea4ff]/20 transition-all duration-300 border border-white/10 hover:border-[#8df6ff]/30"
                >
                  <FaInstagram className="text-white hover:text-[#8df6ff] transition-colors duration-300" aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>

            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-4">
                {[
                  { text: 'Web Design', path: '/services#development' },
                  { text: 'Maintenance & Support', path: '/maintenance-support' },
                  { text: 'SEO Optimization', path: '/services#seo' }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={item.path} 
                      className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      onClick={() => handleLinkClick(item.path)}
                    >
                      <span className="w-1 h-1 bg-[#8df6ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-4">
                {[
                  { text: 'Blog', path: '/web-development-blog' },
                  { text: 'Portfolio', path: '/our-work' },
                  { text: 'Contact', path: '/contact-us' }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={item.path} 
                      className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      onClick={() => handleLinkClick(item.path)}
                    >
                      <span className="w-1 h-1 bg-[#4ea4ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
              <ul className="space-y-4">
                <li className="text-white/70 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#8df6ff] rounded-full" />
                  16 Hume Road
                </li>
                <li className="text-white/70 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#8df6ff] rounded-full" />
                  South Africa, Johannesburg, 2092
                </li>
                <li>
                  <a 
                    href="mailto:info@virtara.co.za" 
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#8df6ff] rounded-full" />
                    info@virtara.co.za
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+27723271040" 
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#8df6ff] rounded-full" />
                    +27 (072) 327 1040
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/70 text-sm">
                © {currentYear} Virtara. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                {[
                  { text: 'Privacy Policy', path: '/legal/privacy-policy' },
                  { text: 'Terms of Service', path: '/legal/terms-of-service' },
                  { text: 'Cookie Policy', path: '/legal/cookie-policy' }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path} 
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaArrowUp className="text-white text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer; 