import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaBuilding, FaCog} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formIndustries, formWebsiteGoals, formPriorities } from '../../../../constants';
import Badge from '../../../../components/ui/Badge';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

const WebDevForm = ({ 
  tier, 
  formData, 
  handleInputChange, 
  handleSubmit,
  additionalFields = [],
  isSubmitting = false
}) => {
  const getTierData = (dataObject) => dataObject[tier.toLowerCase()] || dataObject.starter;

  const packageFeatures = {
    starter: [
      "Custom Design",
      "Mobile Responsive",
      "4 Pages",
      "Contact Form",
      "Basic SEO"
    ],
    professional: [
      "Everything in Starter",
      "E-Commerce Integration",
      "10 Pages",
      "CMS Integration",
      "Advanced SEO",
      "Social Media Integration"
    ],
    enterprise: [
      "Everything in Professional",
      "Custom Functionality",
      "Unlimited Pages",
      "AI Integration",
      "Priority Support",
      "Analytics Dashboard"
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="text-sm">
            <FaCog className="w-4 h-4 mr-2" />
            {tier} Package
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-8">
          Let's Build Something
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
            {" "}Exceptional
          </span>
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Tell us about your vision, and we'll create a powerful digital solution.
        </p>
      </div>

      {/* Package Confirmation */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl text-white font-semibold mb-2">
              {tier} Website Package Selected
            </h2>
            <p className="text-white/70 mb-4">
              {tier === 'Professional' 
                ? 'Perfect for businesses requiring advanced functionality and custom features.'
                : tier === 'Enterprise'
                ? 'Ideal for large-scale projects with complex requirements and custom solutions.'
                : 'Ideal for small businesses and startups looking to establish a professional online presence.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {packageFeatures[tier.toLowerCase()]?.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <Link to="/services" className="text-[#8df6ff] hover:text-[#4ea4ff] transition-colors text-sm">
            ← Choose a Different Package
          </Link>
        </div>
      </Card>

      {/* Form Section */}
      <Card className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Project Details</h2>
          <p className="text-white/70">Tell us about your project and we'll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                required
              />
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
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Business Name *</label>
              <div className="relative">
                <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Business Name"
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 appearance-none"
                required
              >
                <option value="">Select Industry</option>
                {getTierData(formIndustries).map(industry => (
                  <option key={industry} value={industry} className="bg-[#050910]">{industry}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Website Goal *</label>
              <select
                name="websiteGoal"
                value={formData.websiteGoal}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 appearance-none"
                required
              >
                <option value="">Select Goal</option>
                {getTierData(formWebsiteGoals).map(goal => (
                  <option key={goal} value={goal} className="bg-[#050910]">{goal}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Main Priority *</label>
              <select
                name="mainPriority"
                value={formData.mainPriority}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 appearance-none"
                required
              >
                <option value="">Select Priority</option>
                {getTierData(formPriorities).map(priority => (
                  <option key={priority} value={priority} className="bg-[#050910]">{priority}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Fields */}
          {additionalFields}

          {/* Additional Options */}
          <Card className="p-6 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Services</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="seoOptimization"
                  checked={formData.seoOptimization}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                />
                <span className="text-white/70 group-hover:text-white transition-colors">SEO Optimization</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="contentWriting"
                  checked={formData.contentWriting}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                />
                <span className="text-white/70 group-hover:text-white transition-colors">Content Writing Services</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="maintenance"
                  checked={formData.maintenance}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                />
                <span className="text-white/70 group-hover:text-white transition-colors">Ongoing Maintenance</span>
              </label>
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="px-12 py-4 group"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit & Book a Call
                  <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="px-12 py-4"
            >
              Go Back
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default WebDevForm; 