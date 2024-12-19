import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from 'react-icons/hi';
import { smallLogo } from '../assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        duration: 0.2,
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <nav className="max-w-[720px] w-full bg-[#141414]/90 rounded-full border border-white/10 backdrop-blur-md">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-medium text-sm cursor-pointer flex items-center gap-2"
            >
              <img src={smallLogo} alt="Virtara Logo" className="w-6 h-6" />
              Virtara.io
            </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center bg-[#1C1C1C] rounded-full p-1">
              {['Services', 'Work', 'Blog'].map((item) => (
                <Link to={`/${item.toLowerCase()}`}>
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/70 hover:text-white px-4 py-2 rounded-full hover:bg-[#262626] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
                </Link>
              ))}
              <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                whileTap={{ scale: 0.95 }}
                className="ml-1 px-4 py-2 bg-white text-black text-sm font-medium rounded-full transition-all"
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
                className="md:hidden absolute left-0 right-0 top-full mt-4 bg-[#1C1C1C] rounded-2xl p-4 space-y-2 border border-white/10"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {['Work', 'Services', 'Blog'].map((item) => (
                    <Link key={item} to={`/${item.toLowerCase()}`}>
                      <motion.a
                        href={`#${item.toLowerCase()}`}
                        className="block text-sm text-white/70 hover:text-white px-4 py-2 rounded-full hover:bg-[#262626] transition-all"
                      >
                        {item}
                      </motion.a>
                    </Link>
                  ))}
                  <Link to="/contact">
                    <motion.button 
                      className="w-full px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all"
                    >
                      Contact
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  )
}

export default Navbar