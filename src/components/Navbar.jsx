import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { smallLogo } from '../assets';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Enhanced menu animations
  const menuVariants = {
    initial: {
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const menuItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Close menu when screen size changes to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (path) => {
    setIsOpen(false);
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[780px] w-full rounded-full border border-[#74a7ff]/30 bg-[linear-gradient(120deg,rgba(6,12,24,0.92),rgba(8,16,33,0.9))] backdrop-blur-xl shadow-[0_14px_60px_rgba(3,35,84,0.45)]"
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold text-lg md:text-3xl cursor-pointer flex items-center gap-2 group"
            >
              <motion.img 
                src={smallLogo} 
                alt="Virtara Logo" 
                className="w-6 md:w-10 h-6 md:h-10 transition-transform duration-300 group-hover:rotate-12" 
              />
              <span className="virtara-display bg-gradient-to-r from-[#eaf2ff] via-[#d6ebff] to-[#85d7ff] bg-clip-text text-transparent">
                Virtara
              </span>
            </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white p-2 relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-6 h-0.5 bg-white block transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-white block mt-1 transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="w-6 h-0.5 bg-white block mt-1 transition-all duration-300"
                />
              </motion.div>
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center rounded-full p-1 backdrop-blur-sm border border-[#77b5ff]/20 bg-[#0c1628]/80">
              {[
                { title: 'Services', path: 'services' },
                { title: 'Our Work', path: 'our-work' },
                { title: 'Blog', path: 'web-development-blog' }
              ].map(({ title, path }) => (
                <Link 
                  key={path} 
                  to={`/${path}`}
                  onClick={() => handleLinkClick(`/${path}`)}
                >
                  <motion.div
                    className="text-sm text-[#b7ccf6] hover:text-white px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#2f7bff]/35 to-[#71ddff]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <span className="relative z-10">{title}</span>
                  </motion.div>
                </Link>
              ))}
              <Link to="/contact-us" onClick={() => handleLinkClick('/contact-us')}>
                <motion.button 
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 28px rgba(78, 164, 255, 0.45)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-1 px-6 py-2 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-[#03152f] text-sm font-semibold rounded-full transition-all duration-300 hover:brightness-110"
                >
                  Book Audit
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                variants={menuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="md:hidden absolute left-0 right-0 top-full mt-4 rounded-2xl p-6 space-y-2 border border-[#74a7ff]/30 bg-[linear-gradient(140deg,rgba(6,12,24,0.96),rgba(8,16,33,0.92))] backdrop-blur-xl shadow-[0_14px_60px_rgba(3,35,84,0.45)]"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-4"
                >
                  {[
                    { title: 'Our Work', path: 'our-work' },
                    { title: 'Services', path: 'services' },
                    { title: 'Blog', path: 'web-development-blog' }
                  ].map(({ title, path }, index) => (
                    <motion.div
                      key={path}
                      variants={menuItemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/${path}`}
                        onClick={() => handleLinkClick(`/${path}`)}
                      >
                        <motion.div
                          className="block text-lg text-[#b7ccf6] hover:text-white px-4 py-3 rounded-xl hover:bg-[#1a2f52]/60 transition-all duration-300 group"
                          whileHover={{ x: 10 }}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-[#8cb3f8] text-sm font-mono">0{index + 1}</span>
                            {title}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={menuItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 0.4 }}
                  >
                    <Link to="/contact-us" onClick={() => handleLinkClick('/contact-us')}>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-[#03152f] text-lg font-semibold rounded-xl hover:brightness-110 transition-all duration-300"
                      >
                        Book Strategy Audit
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar
