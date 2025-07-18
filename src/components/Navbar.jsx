import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from 'react-icons/hi';
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
        className="max-w-[720px] w-full bg-[#141414]/95 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl"
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
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
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
            <div className="hidden md:flex items-center bg-[#1C1C1C]/80 rounded-full p-1 backdrop-blur-sm border border-white/5">
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
                    className="text-sm text-white/70 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#00f2fe]/20 to-[#ff00e5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-1 px-6 py-2 bg-gradient-to-r from-white to-white/90 text-black text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Contact
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
                className="md:hidden absolute left-0 right-0 top-full mt-4 bg-[#1C1C1C]/95 rounded-2xl p-6 space-y-2 border border-white/10 backdrop-blur-xl shadow-2xl"
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
                          className="block text-lg text-white/70 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                          whileHover={{ x: 10 }}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-white/40 text-sm font-mono">0{index + 1}</span>
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
                        className="w-full px-6 py-3 bg-gradient-to-r from-white to-white/90 text-black text-lg font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        Get Started
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