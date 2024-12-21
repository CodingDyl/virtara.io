import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaBullseye, FaUsers, FaPalette, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BrandStrategy = () => {
  const brandServices = [
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Market Analysis",
      description: "Deep dive into your market position and competitive landscape."
    },
    {
      icon: <FaBullseye className="w-8 h-8" />,
      title: "Brand Positioning",
      description: "Define your unique value proposition and market differentiation."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Audience Targeting",
      description: "Identify and understand your ideal customer segments."
    },
    {
      icon: <FaPalette className="w-8 h-8" />,
      title: "Visual Identity",
      description: "Develop cohesive brand elements that resonate with your audience."
    }
  ];

  const implementationSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "In-depth analysis of your current brand position and goals"
    },
    {
      step: "02",
      title: "Strategy",
      description: "Develop comprehensive brand guidelines and positioning"
    },
    {
      step: "03",
      title: "Implementation",
      description: "Execute brand strategy across all channels"
    },
    {
      step: "04",
      title: "Optimization",
      description: "Monitor, measure, and refine brand performance"
    }
  ];

  const benefits = [
    {
      title: "Increased Brand Value",
      price: "+45%",
      features: [
        "Enhanced Market Position",
        "Stronger Brand Recognition",
        "Improved Customer Trust",
        "Higher Perceived Value",
        "Better Customer Loyalty"
      ]
    },
    {
      title: "Market Growth",
      price: "+80%",
      features: [
        "Expanded Market Share",
        "New Customer Segments",
        "Increased Sales Conversion",
        "Higher Customer Retention",
        "Improved ROI"
      ],
      highlighted: true
    },
    {
      title: "Long-term Success",
      price: "∞",
      features: [
        "Sustainable Growth",
        "Brand Resilience",
        "Market Leadership",
        "Innovation Opportunities",
        "Competitive Advantage"
      ]
    }
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Strategic Brand
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Development
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-12">
              Transform your business with a powerful brand strategy that drives growth and creates lasting impact
            </p>
          </motion.div>

          {/* Brand Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {brandServices.map((service, index) => (
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

          {/* Implementation Steps */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Implementation Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {implementationSteps.map((step, index) => (
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

          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Expected Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-8 rounded-2xl ${
                    benefit.highlighted 
                      ? 'bg-gradient-to-b from-[#00f2fe]/20 to-[#ff00e5]/20 border border-[#ff00e5]/30' 
                      : 'bg-white/5'
                  }`}
                >
                  <h3 className="text-white text-2xl font-bold mb-4">{benefit.title}</h3>
                  <div className="text-3xl font-bold text-[#00f2fe] mb-6">{benefit.price}</div>
                  <ul className="space-y-4 mb-8">
                    {benefit.features.map((feature, fIndex) => (
                      <li key={fIndex} className="text-white/70 flex items-center">
                        <FaArrowRight className="w-4 h-4 mr-2 text-[#ff00e5]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Brand?</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandStrategy;
