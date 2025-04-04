import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaSearch, FaChartLine } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../../components/Notifications/notification';
import sendEmail from "../../../server/workflow";

const Seo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    currentWebsite: '',
    targetLocation: '',
    mainCompetitors: '',
    businessGoals: '',
    currentKeywords: '',
    targetKeywords: '',
    contentCreation: false,
    localSEO: false,
    technicalSEO: false,
    linkBuilding: false
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const industries = [
    'Retail',
    'Services',
    'E-commerce',
    'Healthcare',
    'Education',
    'Technology',
    'Hospitality',
    'Other'
  ];

  const businessGoals = [
    'Increase Local Visibility',
    'Boost Online Sales',
    'Generate More Leads',
    'Improve Brand Awareness',
    'Outrank Competitors',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await sendEmail(
        "New SEO Service Inquiry",
        `
        SEO SERVICE INQUIRY
        <br /><br />

        Contact Information:<br />
        Name: ${formData.name}<br />
        Email: ${formData.email}<br />
        Phone: ${formData.phone}<br />
        Business Name: ${formData.businessName}<br />
        <br />

        Business Details:<br />
        Industry: ${formData.industry}<br />
        Current Website: ${formData.currentWebsite}<br />
        Target Location: ${formData.targetLocation}<br />
        Main Competitors: ${formData.mainCompetitors}<br />
        Business Goals: ${formData.businessGoals}<br />
        <br />

        SEO Requirements:<br />
        Current Keywords: ${formData.currentKeywords}<br />
        Target Keywords: ${formData.targetKeywords}<br />
        <br />

        Additional Services Requested:<br />
        - Content Creation: ${formData.contentCreation ? 'Yes' : 'No'}<br />
        - Local SEO: ${formData.localSEO ? 'Yes' : 'No'}<br />
        - Technical SEO: ${formData.technicalSEO ? 'Yes' : 'No'}<br />
        - Link Building: ${formData.linkBuilding ? 'Yes' : 'No'}<br />
        `
      );

      setNotification({
        message: "Thanks for your interest! We'll analyze your requirements and reach out within 24 hours.",
        type: 'success',
        isVisible: true
      });

      setTimeout(() => {
        navigate('/seo/thank-you');
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
              Boost Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Search Rankings
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Get found by more customers with our proven SEO strategies
            </p>

            {/* SEO Benefits Section */}
            <div className="bg-white/5 p-6 rounded-xl mb-8">
              <h2 className="text-xl text-white font-semibold mb-4">
                Why SEO Matters for Your Business
              </h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-2">
                  <FaChartLine className="text-[#00f2fe]" />
                  Increase organic traffic and reduce paid advertising costs
                </li>
                <li className="flex items-center gap-2">
                  <FaSearch className="text-[#00f2fe]" />
                  Appear in front of customers actively searching for your services
                </li>
                <li className="flex items-center gap-2">
                  <FaChartLine className="text-[#00f2fe]" />
                  Build long-term sustainable growth and brand authority
                </li>
              </ul>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Information */}
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
                    className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Website & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 mb-2">Current Website URL</label>
                  <input
                    type="url"
                    name="currentWebsite"
                    value={formData.currentWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    placeholder="https://"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Target Location</label>
                  <input
                    type="text"
                    name="targetLocation"
                    value={formData.targetLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    placeholder="City, Country or Global"
                    required
                  />
                </div>
              </div>

              {/* SEO Specifics */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-white/70 mb-2">Main Competitors (Optional)</label>
                  <textarea
                    name="mainCompetitors"
                    value={formData.mainCompetitors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    rows="2"
                    placeholder="List your main competitors' websites"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Target Keywords (Optional)</label>
                  <textarea
                    name="targetKeywords"
                    value={formData.targetKeywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
                    rows="2"
                    placeholder="What keywords would you like to rank for?"
                  />
                </div>
              </div>

              {/* Additional Services */}
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-4">Additional Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="contentCreation"
                      checked={formData.contentCreation}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">Content Creation</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="localSEO"
                      checked={formData.localSEO}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">Local SEO</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="technicalSEO"
                      checked={formData.technicalSEO}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">Technical SEO</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="linkBuilding"
                      checked={formData.linkBuilding}
                      onChange={handleInputChange}
                      className="form-checkbox text-[#00f2fe]"
                    />
                    <span className="text-white/70">Link Building</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Get Your Free SEO Analysis
                  <FaArrowRight />
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

export default Seo;
