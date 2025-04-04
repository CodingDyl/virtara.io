import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../../../components/Notifications/notification';
import sendEmail from "../../../../server/workflow";

const Starter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    existingWebsite: '',
    websiteGoal: '',
    mainPriority: '',
    brandingMaterials: [],
    additionalFeatures: [],
    seoOptimization: false,
    contentWriting: false,
    maintenance: false
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const industries = [
    'Retail',
    'Services',
    'Personal Brand',
    'Healthcare',
    'Education',
    'Technology',
    'Other'
  ];

  const websiteGoals = [
    'Portfolio',
    'Online Store',
    'Information',
    'Blog',
    'Lead Generation',
    'Other'
  ];

  const priorities = [
    'Design',
    'Functionality',
    'Speed',
    'SEO',
    'Mobile Experience',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'brandingMaterials' || name === 'additionalFeatures') {
        const updatedArray = checked
          ? [...formData[name], value]
          : formData[name].filter(item => item !== value);
        setFormData(prev => ({ ...prev, [name]: updatedArray }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await sendEmail(
        "New Starter Package Inquiry",
        `
        STARTER PACKAGE INQUIRY

        Contact Information: <br />
        Name: ${formData.name} <br />
        Email: ${formData.email} <br />
        Business Name: ${formData.businessName} <br />

        Project Details: <br />
        Industry: ${formData.industry} <br />
        Website Goal: ${formData.websiteGoal} <br />
        Main Priority: ${formData.mainPriority} <br />
        Existing Website: ${formData.existingWebsite} <br />

        Additional Services Requested: <br />
        - SEO Optimization: ${formData.seoOptimization ? 'Yes' : 'No'} <br />
        - Content Writing: ${formData.contentWriting ? 'Yes' : 'No'} <br />
        - Maintenance: ${formData.maintenance ? 'Yes' : 'No'} <br />
        `
      );

      setNotification({
        message: "Thanks for your interest! We'll reach out within 24 hours to discuss your project.",
        type: 'success',
        isVisible: true
      });

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        navigate('/starter/thank-you');
      }, 2000);

    } catch (error) {
      console.error(error);
      setNotification({
        message: "There was an error submitting your form. Please try again.",
        type: 'error',
        isVisible: true
      });
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      <section className="min-h-screen pt-32 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-4">
              Let's Bring Your Vision to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Life!
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Tell us more about your business so we can get started.
            </p>

            {/* Package Confirmation */}
            <div className="bg-white/5 p-6 rounded-xl mb-8">
              <h2 className="text-xl text-white font-semibold mb-2">
                You've chosen the Starter Website Package
              </h2>
              <p className="text-white/70 mb-4">
                Ideal for small businesses and startups looking to establish a professional online presence.
              </p>
              <Link to="/services" className="text-[#00f2fe] hover:text-[#ff00e5] transition-colors">
                ← Choose a Different Package
              </Link>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Business Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 mb-2">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 mb-2">Website Goal</label>
                  <select
                    name="websiteGoal"
                    value={formData.websiteGoal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  >
                    <option value="">Select Goal</option>
                    {websiteGoals.map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Main Priority</label>
                  <select
                    name="mainPriority"
                    value={formData.mainPriority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  >
                    <option value="">Select Priority</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Options */}
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-4">Additional Services</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="seoOptimization"
                      checked={formData.seoOptimization}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">SEO Optimization</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="contentWriting"
                      checked={formData.contentWriting}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">Content Writing Services</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="maintenance"
                      checked={formData.maintenance}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">Ongoing Maintenance</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Submit & Book a Call
                  <FaArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="px-8 py-4 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                >
                  Get a Quote
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Starter;