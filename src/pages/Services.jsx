import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCode, FaShoppingCart, FaRobot, FaTools, FaSearch, FaHashtag, FaAd, FaEnvelope } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { pricingTiers, process } from '../constants';
import { useLocation } from 'react-router-dom';

const Work = () => {
  const [activeTab, setActiveTab] = useState('development');
  const [activeFilter, setActiveFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#marketing') {
      setActiveTab('marketing');
    } else if (location.hash === '#development') {
      setActiveTab('development');
    }
  }, [location]);

  const services = [
    {
      icon: <FaCode className="w-8 h-8" />,
      title: "Custom Website Design",
      description: "Bespoke websites tailored to your brand's unique needs and goals."
    },
    {
      icon: <FaShoppingCart className="w-8 h-8" />,
      title: "E-Commerce Solutions",
      description: "Powerful online stores with seamless checkout experiences."
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: "AI-Powered Features",
      description: "Intelligent chatbots and personalization for enhanced user experience."
    },
    {
      icon: <FaTools className="w-8 h-8" />,
      title: "Maintenance Plans",
      description: "Regular updates and support to keep your site running smoothly."
    }
  ];

  const marketingServices = [
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Search Engine Optimization",
      description: "Boost your visibility and rank higher in search results."
    },
    {
      icon: <FaHashtag className="w-8 h-8" />,
      title: "Social Media Marketing",
      description: "Engage your audience across all social platforms."
    },
    {
      icon: <FaAd className="w-8 h-8" />,
      title: "Paid Advertising",
      description: "Strategic PPC campaigns that drive conversions."
    },
    {
      icon: <FaEnvelope className="w-8 h-8" />,
      title: "Email Marketing",
      description: "Nurture leads and boost customer retention."
    }
  ];

  const marketingCaseStudies = [
    {
      title: "E-commerce Growth",
      stats: "120% Traffic Increase",
      description: "Implemented SEO strategy resulting in doubled organic traffic",
      image: "https://via.placeholder.com/600x400"
    },
    {
      title: "Social Media Success",
      stats: "300% Engagement Growth",
      description: "Developed content strategy that tripled user engagement",
      image: "https://via.placeholder.com/600x400"
    },
    // Add more case studies
  ];

  const marketingPricing = [
    {
      name: "Startup",
      price: "R4000/month",
      features: [
        "Basic SEO Setup",
        "Social Media Management (2 platforms)",
        "Monthly Analytics Report",
        "Email Marketing Setup",
        "Basic PPC Campaign"
      ]
    },
    {
      name: "Growth",
      price: "R10,000/month",
      features: [
        "Advanced SEO Optimization",
        "Social Media Management (4 platforms)",
        "Bi-weekly Analytics Reports",
        "Email Marketing Automation",
        "Advanced PPC Campaigns",
        "Content Marketing"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Full-Service SEO",
        "Comprehensive Social Media",
        "Weekly Reports",
        "Advanced Marketing Automation",
        "Multi-Channel Campaigns",
        "Dedicated Account Manager"
      ]
    }
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex rounded-full bg-white/5 p-1">
              <a
                href="#development"
                onClick={() => setActiveTab('development')}
                className={`px-8 py-3 rounded-full transition-colors ${
                  activeTab === 'development' 
                    ? 'bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Web Development
              </a>
              <a
                href="#marketing"
                onClick={() => setActiveTab('marketing')}
                className={`px-8 py-3 rounded-full transition-colors ${
                  activeTab === 'marketing' 
                    ? 'bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Digital Marketing
              </a>
            </div>
          </div>

          <AnimatePresence mode='wait'>
            {activeTab === 'development' ? (
              <motion.div
                id="development"
                key="development"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
                    Modern Web Design
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                      {" "}Tailored to Your Needs
                    </span>
                  </h1>
                  <p className="text-lg text-white/70 mb-12">
                    Elevate your digital presence with our cutting-edge web solutions
                  </p>
                </motion.div>

                {/* Services Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-[#00f2fe] mb-4">{service.icon}</div>
                      <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-white/70">{service.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Process Section */}
                <div className="mb-20">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Our Process</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {process.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-[#ff00e5] text-4xl font-bold mb-4">{step.step}</div>
                        <h3 className="text-white text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-white/70">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-20">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Transparent Pricing</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingTiers.map((tier, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-8 rounded-2xl ${
                          tier.highlighted 
                            ? 'bg-gradient-to-b from-[#00f2fe]/20 to-[#ff00e5]/20 border border-[#ff00e5]/30' 
                            : 'bg-white/5'
                        }`}
                      >
                        <h3 className="text-white text-2xl font-bold mb-4">{tier.name}</h3>
                        <div className="text-3xl font-bold text-[#00f2fe] mb-6">{tier.price}</div>
                        <ul className="space-y-4 mb-8">
                          {tier.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-white/70 flex items-center">
                              <FaArrowRight className="w-4 h-4 mr-2 text-[#ff00e5]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                          Get Started
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    Let's Talk
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                id="marketing"
                key="marketing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
                  Drive Results with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                    {" "}Targeted Marketing
                  </span>
                </h1>
                
                {/* Marketing Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                  {marketingServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-[#00f2fe] mb-4">{service.icon}</div>
                      <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-white/70">{service.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Case Studies */}
                <div className="mb-20">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Success Stories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {marketingCaseStudies.map((study, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative group overflow-hidden rounded-2xl bg-white/5"
                      >
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="w-full h-[300px] object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-white text-2xl font-bold mb-2">{study.title}</h3>
                          <div className="text-[#00f2fe] text-xl font-semibold mb-2">{study.stats}</div>
                          <p className="text-white/70">{study.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Marketing Pricing */}
                <div className="mb-20">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Marketing Packages</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {marketingPricing.map((tier, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-8 rounded-2xl ${
                          tier.highlighted 
                            ? 'bg-gradient-to-b from-[#00f2fe]/20 to-[#ff00e5]/20 border border-[#ff00e5]/30' 
                            : 'bg-white/5'
                        }`}
                      >
                        <h3 className="text-white text-2xl font-bold mb-4">{tier.name}</h3>
                        <div className="text-3xl font-bold text-[#00f2fe] mb-6">{tier.price}</div>
                        <ul className="space-y-4 mb-8">
                          {tier.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-white/70 flex items-center">
                              <FaArrowRight className="w-4 h-4 mr-2 text-[#ff00e5]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                          Get Started
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Marketing CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Grow Your Business?</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    Let's Talk Strategy
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Work;