import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      content: "info@virtara.io",
      link: "mailto:info@virtara.io"
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone",
      content: "+27 (072) 327 1040",
      link: "tel:+27723271040"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Location",
      content: "16 Hume Road, Johannesburg, 2092",
      link: "https://maps.google.com"
    }
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Let's Create Something
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Amazing
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-12">
              Ready to transform your digital presence? We're here to help bring your vision to life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="text-white/60 group-hover:text-[#ff00e5] transition-colors mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">{info.title}</h3>
                  <p className="text-white/70">{info.content}</p>
                </motion.a>
              ))}
            </div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-2">Message</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none transition-colors"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;