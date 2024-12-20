import { motion } from "framer-motion";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = document.querySelector('footer');
      const rect = footer.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    document.querySelector('footer').addEventListener('mousemove', handleMouseMove);
    return () => {
      document.querySelector('footer')?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <footer className="bg-gradient-to-b from-[#161616] to-[#0F0F0F] text-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute blur-[100px] rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30"
        style={{
          width: '40%',
          height: '40%',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.2s, top 0.2s',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/80 to-[#0F0F0F]/80" />

      <div className="relative">
        <div className="container mx-auto px-6 py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Virtara</h3>
              <p className="text-white/70">
                Creating digital experiences that transform businesses and inspire growth.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <FaLinkedinIn />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <FaInstagram />
                </motion.a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Web Design</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Brand Strategy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">SEO Optimization</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-white/70">16 Hume Road</li>
                <li className="text-white/70">South Africa, Johannesburg, 2092</li>
                <li><a href="mailto:info@virtara.co.za" className="text-white/70 hover:text-white transition-colors">info@virtara.co.za</a></li>
                <li><a href="tel:+27723271040" className="text-white/70 hover:text-white transition-colors">+27 (072) 327 1040</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/70 text-sm">
                © {currentYear} Virtara. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 