import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSearch, FaChartLine, FaGlobe, FaBuilding, FaEnvelope, FaPhone, FaBullseye, FaUsers} from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../components/Notifications/notification';
import sendEmail from "../../../server/workflow";
import Badge from '../../../components/ui/Badge';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const seoBenefits = [
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Increase Organic Traffic",
      description: "Drive more qualified visitors to your website without paid advertising"
    },
    {
      icon: <FaSearch className="w-6 h-6" />,
      title: "Better Search Visibility",
      description: "Appear in front of customers actively searching for your services"
    },
    {
      icon: <FaBullseye className="w-6 h-6" />,
      title: "Targeted Audience",
      description: "Reach the right people at the right time with strategic keyword targeting"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Build Authority",
      description: "Establish your brand as a trusted leader in your industry"
    }
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
    setIsSubmitting(true);
    
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>SEO Services | Boost Your Search Rankings | Virtara</title>
        <meta name="description" content="Get found by more customers with our proven SEO strategies. Boost your search rankings and drive organic traffic to your website." />
        <meta name="keywords" content="SEO services, search engine optimization, organic traffic, keyword ranking, local SEO" />
        <link rel="canonical" href="https://virtara.co.za/seo" />
      </Helmet>
      <div className="bg-[#050910] min-h-screen">
        <Navbar />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        />

        <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <div className="flex justify-center mb-6">
                <Badge variant="outline" className="text-sm">
                  <FaSearch className="w-4 h-4 mr-2" />
                  SEO Services
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-8">
                Boost Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                  {" "}Search Rankings
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Get found by more customers with our proven SEO strategies
              </p>
            </motion.div>

            {/* SEO Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {seoBenefits.map((benefit, index) => (
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
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Your Free SEO Analysis</h2>
                  <p className="text-white/70">Tell us about your business and we'll create a customized SEO strategy</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
                      <div className="relative">
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
                      <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+27 (0) 12 345 6789"
                          className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                        />
                      </div>
                    </div>
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
                  </div>

                  {/* Industry & Website */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        {industries.map(industry => (
                          <option key={industry} value={industry} className="bg-[#050910]">{industry}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Current Website URL *</label>
                      <div className="relative">
                        <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <input
                          type="url"
                          name="currentWebsite"
                          value={formData.currentWebsite}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                          className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location & Goals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Target Location *</label>
                      <input
                        type="text"
                        name="targetLocation"
                        value={formData.targetLocation}
                        onChange={handleInputChange}
                        placeholder="City, Country or Global"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Business Goals</label>
                      <select
                        name="businessGoals"
                        value={formData.businessGoals}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 appearance-none"
                      >
                        <option value="">Select Primary Goal</option>
                        {businessGoals.map(goal => (
                          <option key={goal} value={goal} className="bg-[#050910]">{goal}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* SEO Specifics */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Main Competitors (Optional)</label>
                      <textarea
                        name="mainCompetitors"
                        value={formData.mainCompetitors}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 resize-none"
                        rows="3"
                        placeholder="List your main competitors' websites"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Target Keywords (Optional)</label>
                      <textarea
                        name="targetKeywords"
                        value={formData.targetKeywords}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 resize-none"
                        rows="3"
                        placeholder="What keywords would you like to rank for?"
                      />
                    </div>
                  </div>

                  {/* Additional Services */}
                  <Card className="p-6 bg-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4">Additional Services</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="contentCreation"
                          checked={formData.contentCreation}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                        />
                        <span className="text-white/70 group-hover:text-white transition-colors">Content Creation</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="localSEO"
                          checked={formData.localSEO}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                        />
                        <span className="text-white/70 group-hover:text-white transition-colors">Local SEO</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="technicalSEO"
                          checked={formData.technicalSEO}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                        />
                        <span className="text-white/70 group-hover:text-white transition-colors">Technical SEO</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="linkBuilding"
                          checked={formData.linkBuilding}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#8df6ff] bg-white/5 border-white/10 rounded focus:ring-[#8df6ff] focus:ring-2"
                        />
                        <span className="text-white/70 group-hover:text-white transition-colors">Link Building</span>
                      </label>
                    </div>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex justify-center">
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
                          Get Your Free SEO Analysis
                          <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
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
};

export default Seo;
