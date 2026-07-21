import { motion } from 'framer-motion';
import { FaChartLine, FaShieldAlt, FaServer, FaTools, FaCheck } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const MaintenanceSupport = () => {
  const maintenanceServices = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Security & Updates",
      description: "Regular updates and security monitoring to keep your site protected."
    },
    {
      icon: <FaServer className="w-8 h-8" />,
      title: "Performance",
      description: "Optimization and monitoring to ensure peak site performance."
    },
    {
      icon: <FaTools className="w-8 h-8" />,
      title: "Technical Support",
      description: "Expert assistance for any technical issues or requirements."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Growth Support",
      description: "Proactive improvements and feature development as needed."
    }
  ];

  const plans = [
    {
      title: "Essential Maintenance",
      price: "R1,000",
      features: [
        "Monthly CMS & Plugin Updates",
        "Weekly Secure Backups",
        "Basic Malware Scans",
        "Uptime Monitoring",
        "48-hour Email Support"
      ]
    },
    {
      title: "Pro Maintenance",
      price: "R2,500",
      features: [
        "All Essential Features",
        "Performance Optimization",
        "2 Hours Content Updates",
        "Advanced Security Scans",
        "24-hour Priority Support",
        "Monthly Analytics Review"
      ],
      highlighted: true
    },
    {
      title: "Premium Maintenance",
      price: "R5,000",
      features: [
        "All Pro Features",
        "5 Hours Custom Development",
        "E-Commerce Support",
        "Proactive Improvements",
        "2-Hour Downtime Response",
        "Dedicated Account Manager"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Website Maintenance & Support Services | Professional Site Care</title>
        <meta name="description" content="Keep your website secure, fast, and up-to-date with our professional maintenance and support services. Choose from three comprehensive care plans." />
        <meta name="keywords" content="website maintenance, website support, security updates, performance optimization, technical support" />
        <link rel="canonical" href="https://www.virtara.co.za/maintenance-support" />
      </Helmet>
      <div className="bg-[#050910] min-h-screen">
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
                Website
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                  {" "}Maintenance
                </span>
              </h1>
              <p className="text-lg text-white/70 mb-12">
                Keep your website secure, optimized, and running smoothly with our comprehensive maintenance plans
              </p>
            </motion.div>

            {/* Brand Services Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {maintenanceServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#8df6ff] mb-4">{service.icon}</div>
                  <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Pricing Section */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-8 rounded-2xl ${
                      plan.highlighted 
                        ? 'bg-gradient-to-b from-[#8df6ff]/20 to-[#4ea4ff]/20 border border-[#4ea4ff]/30' 
                        : 'bg-white/5'
                    }`}
                  >
                    <h3 className="text-white text-2xl font-bold mb-4">{plan.title}</h3>
                    <div className="text-3xl font-bold text-[#8df6ff] mb-6">{plan.price}<span className="text-lg">/month</span></div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-white/70 flex items-center">
                          <FaCheck className="w-4 h-4 mr-2 text-[#4ea4ff]" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Keep Your Site in Perfect Shape?</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Get Started Now
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MaintenanceSupport;
