import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function StartaProject() {
  const services = [
    {
      category: "Web Development",
      options: [
        "Custom Website Design",
        "E-Commerce Solutions",
        "Web Application Development",
        "Website Maintenance"
      ]
    },
    {
      category: "Digital Marketing",
      options: [
        "Search Engine Optimization",
        "Social Media Marketing",
        "Paid Advertising",
        "Email Marketing"
      ]
    },
    {
      category: "Brand Strategy",
      options: [
        "Brand Identity Design",
        "Brand Guidelines",
        "Brand Messaging",
        "Visual Identity"
      ]
    }
  ];

  const projectSizes = [
    "Small (R5,000 - R20,000)",
    "Medium (R20,000 - R50,000)",
    "Large (R50,000 - R100,000)",
    "Enterprise (R100,000+)"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Schedule Your Free
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Strategy Session
              </span>
            </h1>
            <p className="text-lg text-white/70">
              Let's discuss your project and create a roadmap for your digital success
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                />
                <input
                  type="url"
                  placeholder="Website (if existing)"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                />
                <select
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:outline-none focus:border-[#00f2fe] appearance-none"
                  required
                >
                  <option value="">Project Budget Range</option>
                  {projectSizes.map((size, index) => (
                    <option key={index} value={size} className="bg-[#0F0F0F]">
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <select
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:outline-none focus:border-[#00f2fe] appearance-none"
                required
              >
                <option value="">Select Primary Service</option>
                {services.map((service) => (
                  <optgroup key={service.category} label={service.category} className="bg-[#0F0F0F]">
                    {service.options.map((option, index) => (
                      <option key={index} value={option} className="bg-[#0F0F0F]">
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <textarea
                placeholder="Tell us about your project goals and requirements..."
                rows="6"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                required
              />
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Schedule Consultation
                <FaArrowRight />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default StartaProject;
