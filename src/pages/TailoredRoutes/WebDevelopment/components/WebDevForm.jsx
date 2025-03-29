import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formIndustries, formWebsiteGoals, formPriorities } from '../../../../constants';

const WebDevForm = ({ 
  tier, 
  formData, 
  handleInputChange, 
  handleSubmit,
  additionalFields = []
}) => {
  const getTierData = (dataObject) => dataObject[tier.toLowerCase()] || dataObject.starter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-4">
        Let's Build Something
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
          {" "}Exceptional
        </span>
      </h1>
      <p className="text-lg text-white/70 mb-8">
        Tell us about your vision, and we'll create a powerful digital solution.
      </p>

      {/* Package Confirmation */}
      <div className="bg-white/5 p-6 rounded-xl mb-8">
        <h2 className="text-xl text-white font-semibold mb-2">
          {tier} Website Package Selected
        </h2>
        <p className="text-white/70 mb-4">
          {tier === 'Professional' 
            ? 'Perfect for businesses requiring advanced functionality and custom features.'
            : 'Ideal for small businesses and startups looking to establish a professional online presence.'}
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
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none [&>option]:bg-[#0F0F0F]"
              required
            >
              <option value="" className="bg-[#0F0F0F]">Select Industry</option>
              {getTierData(formIndustries).map(industry => (
                <option key={industry} value={industry} className="bg-[#0F0F0F]">{industry}</option>
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
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none [&>option]:bg-[#0F0F0F]"
              required
            >
              <option value="" className="bg-[#0F0F0F]">Select Goal</option>
              {getTierData(formWebsiteGoals).map(goal => (
                <option key={goal} value={goal} className="bg-[#0F0F0F]">{goal}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/70 mb-2">Main Priority</label>
            <select
              name="mainPriority"
              value={formData.mainPriority}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none [&>option]:bg-[#0F0F0F]"
              required
            >
              <option value="" className="bg-[#0F0F0F]">Select Priority</option>
              {getTierData(formPriorities).map(priority => (
                <option key={priority} value={priority} className="bg-[#0F0F0F]">{priority}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Fields */}
        {additionalFields}

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
  );
};

export default WebDevForm; 