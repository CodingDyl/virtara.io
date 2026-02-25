import React, { useState } from 'react';
import { motion } from "framer-motion";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Helmet } from 'react-helmet-async';
import { submitAuditBooking } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';

const AuditPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    additionalWebsites: '',
    preferredDate: '',
    preferredTime: '',
    meetingPlatform: 'teams',
    additionalNotes: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    message: '',
    isError: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, message: '', isError: false });

    try {
      const result = await submitAuditBooking(formData);
      
      if (result.success) {
        setSubmitStatus({
          loading: false,
          message: 'Thank you! Your audit booking has been submitted successfully.',
          isError: false
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          website: '',
          additionalWebsites: '',
          preferredDate: '',
          preferredTime: '',
          meetingPlatform: 'teams',
          additionalNotes: ''
        });
        navigate('resources/audit/thank-you');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        message: error.message || 'Something went wrong. Please try again.',
        isError: true
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Website Audit Booking | Virtara</title>
        <meta name="description" content="Book your personalized website audit session with our experts and get detailed insights to improve your website's performance." />
      </Helmet>

      <div className="bg-[#050910] min-h-screen">
        <Navbar />
        
        <section className="min-h-screen pt-32 md:pt-40 pb-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                  Book Your Website
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                    {" "}Audit Session
                  </span>
                </h1>
                <p className="text-xl text-white/70 mb-8">
                  Let's analyze your website and create a custom plan to boost your conversions
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/5 p-8 rounded-2xl border border-white/10"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-white mb-2">Primary Website to Audit</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="additionalWebsites" className="block text-white mb-2">Additional Website Links (Optional)</label>
                    <input
                      type="text"
                      id="additionalWebsites"
                      name="additionalWebsites"
                      placeholder="Add any additional URLs, separated by commas"
                      value={formData.additionalWebsites}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff]"
                    />
                    <p className="text-white/50 text-sm mt-1">E.g., competitor websites or other sites you'd like us to reference</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredDate" className="block text-white mb-2">Preferred Date</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff] [color-scheme:dark]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-white mb-2">Preferred Time</label>
                      <input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff] [color-scheme:dark]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="meetingPlatform" className="block text-white mb-2">Preferred Platform</label>
                    <select
                      id="meetingPlatform"
                      name="meetingPlatform"
                      value={formData.meetingPlatform}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff] [&>option]:bg-[#050910]"
                    >
                      <option value="teams">Microsoft Teams</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="additionalNotes" className="block text-white mb-2">Additional Notes</label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8df6ff]"
                    ></textarea>
                  </div>

                  {submitStatus.message && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.isError 
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                        : 'bg-green-500/10 text-green-500 border border-green-500/20'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitStatus.loading}
                    whileHover={{ scale: submitStatus.loading ? 1 : 1.02 }}
                    whileTap={{ scale: submitStatus.loading ? 1 : 0.98 }}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-white rounded-full font-medium 
                      ${submitStatus.loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 transition-opacity'}`}
                  >
                    {submitStatus.loading ? 'Submitting...' : 'Book My Audit Session'}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AuditPage;