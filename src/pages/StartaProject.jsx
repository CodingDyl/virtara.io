import { motion } from "framer-motion";
import { FaArrowRight, FaCalendar, FaPhone, FaEnvelope, FaBuilding, FaGlobe, FaCoins, FaCog, FaComments } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from "react";
import Notification from '../components/Notifications/notification';
import sendEmail from "../server/workflow";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';


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
      console.log(response);
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

  const benefits = [
    {
      icon: <FaCalendar className="w-6 h-6" />,
      title: "Free Consultation",
      description: "Get expert advice on your project requirements"
    },
    {
      icon: <FaCog className="w-6 h-6" />,
      title: "Custom Solutions",
      description: "Tailored approach to meet your specific needs"
    },
    {
      icon: <FaComments className="w-6 h-6" />,
      title: "Ongoing Support",
      description: "Continuous communication throughout the process"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Start Your Digital Project | Web Development & Marketing Solutions</title>
        <meta name="description" content="Ready to start your digital project? Let's collaborate to create innovative web solutions and marketing strategies that drive results for your business." />
        <meta name="keywords" content="start project, web development project, digital marketing services, custom solutions" />
        <link rel="canonical" href="https://virtara.co.za/starta-project" />
      </Helmet>
      <div className="bg-[#050910] min-h-screen">
        <Navbar />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={closeNotification}
        />

        <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-6">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <div className="flex justify-center mb-6">
                <Badge variant="outline" className="text-sm">
                  <FaComments className="w-4 h-4 mr-2" />
                  Let's Build Together
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
                Schedule Your Free
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                  {" "}Strategy Session
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Let's discuss your project and create a roadmap for your digital success
              </p>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] rounded-full flex items-center justify-center text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </Card>
              ))}
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Project Details</h2>
                  <p className="text-white/70">Tell us about your project and we'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Email Address *</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+27 (0) 12 345 6789"
                            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Company Name</label>
                        <div className="relative">
                          <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your Company"
                            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Website (if existing)</label>
                        <div className="relative">
                          <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Project Budget Range *</label>
                        <div className="relative">
                          <FaCoins className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 appearance-none"
                            required
                          >
                            <option value="">Select Budget Range</option>
                            {projectSizes.map((size, index) => (
                              <option key={index} value={size} className="bg-[#050910]">
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Primary Service *</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 appearance-none"
                        required
                      >
                        <option value="">Select Primary Service</option>
                        {services.map((service) => (
                          <optgroup key={service.category} label={service.category} className="bg-[#050910]">
                            {service.options.map((option, index) => (
                              <option key={index} value={option} className="bg-[#050910]">
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Project Details *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project goals, requirements, timeline, and any specific features you need..."
                        rows="6"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="px-12 py-4 group"
                    >
                      Schedule Consultation
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default StartaProject;
