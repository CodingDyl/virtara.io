import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from "react";
import Notification from '../components/Notifications/notification';
import sendEmail from "../server/workflow";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


function StartaProject() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget: "",
    service: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      budget: "",
      service: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEmail(
        `Start a Project Request: ${formData.service}`,
        `
        Name: ${formData.name}, <br />
        Email: ${formData.email}, <br />
        Phone: ${formData.phone}, <br />

        Company: ${formData.company}, <br />  
        Website: ${formData.website}, <br />
        Budget: ${formData.budget}, <br />
        Service: ${formData.service}, <br />
        Message: ${formData.message}
      `
      );
      resetForm();
      setNotification({
        message: "Email sent successfully!",
        type: "success",
        isVisible: true
      });
      navigate('/resources/start-a-project/thank-you');
    } catch (error) {
      console.error(error);
      setNotification({
        message: "Failed to send email. Please try again later.",
        type: "error",
        isVisible: true
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        budget: "",
        service: "",
        message: "",
      });
    }
  };

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
  return (
    <>
      <Helmet>
        <title>Start Your Digital Project | Web Development & Marketing Solutions</title>
        <meta name="description" content="Ready to start your digital project? Let's collaborate to create innovative web solutions and marketing strategies that drive results for your business." />
        <meta name="keywords" content="start project, web development project, digital marketing services, custom solutions" />
        <link rel="canonical" href="https://virtara.co.za/starta-project" />
      </Helmet>
      <div className="bg-[#0F0F0F] min-h-screen">
        <Navbar />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={closeNotification}
        />

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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                  />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Website (if existing)"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#00f2fe]"
                  />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
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
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
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
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
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
                  onClick={handleSubmit}
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
    </>
  );
}

export default StartaProject;
