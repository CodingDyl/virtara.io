import React, { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import Notification from '../../../../components/Notifications/notification';
import WebDevForm from '../components/WebDevForm';
import sendEmail from "../../../../server/workflow";
import { useNavigate } from 'react-router-dom';

const Enterprise = () => {
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
    currentInfrastructure: '',
    securityRequirements: '',
    complianceNeeds: '',
    integrationRequirements: '',
    expectedTraffic: '',
    globalLocations: '',
    customFeatures: [],
    aiIntegration: false,
    dataAnalytics: false,
    customDashboard: false,
    prioritySupport: false,
    deploymentStrategy: false
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'customFeatures') {
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
        "New Enterprise Package Inquiry",
        `
        ENTERPRISE PACKAGE INQUIRY

        Contact Information:
        Name: ${formData.name}
        Email: ${formData.email}
        Business Name: ${formData.businessName}

        Project Details:
        Industry: ${formData.industry}
        Website Goal: ${formData.websiteGoal}
        Main Priority: ${formData.mainPriority}

        Technical Requirements:
        Current Infrastructure: ${formData.currentInfrastructure}
        Security Requirements: ${formData.securityRequirements}
        Compliance Needs: ${formData.complianceNeeds}
        Integration Requirements: ${formData.integrationRequirements}
        Expected Monthly Traffic: ${formData.expectedTraffic}
        Global Locations: ${formData.globalLocations}

        Enterprise Features Requested:
        - AI Integration: ${formData.aiIntegration ? 'Yes' : 'No'}
        - Data Analytics: ${formData.dataAnalytics ? 'Yes' : 'No'}
        - Custom Dashboard: ${formData.customDashboard ? 'Yes' : 'No'}
        - Priority Support: ${formData.prioritySupport ? 'Yes' : 'No'}
        - Deployment Strategy: ${formData.deploymentStrategy ? 'Yes' : 'No'}
        `
      );

      setNotification({
        message: "Thanks for your interest! We'll reach out within 24 hours to discuss your project.",
        type: 'success',
        isVisible: true
      });

      setTimeout(() => {
        navigate('/thank-you');
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

  // Additional fields specific to Enterprise tier
  const additionalFields = (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/70 mb-2">Current Infrastructure</label>
          <textarea
            name="currentInfrastructure"
            value={formData.currentInfrastructure}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
            placeholder="Describe your current tech stack and infrastructure"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-white/70 mb-2">Integration Requirements</label>
          <textarea
            name="integrationRequirements"
            value={formData.integrationRequirements}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
            placeholder="List systems that need to be integrated"
            rows="3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/70 mb-2">Security Requirements</label>
          <input
            type="text"
            name="securityRequirements"
            value={formData.securityRequirements}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
            placeholder="e.g., ISO 27001, SOC 2, etc."
          />
        </div>
        <div>
          <label className="block text-white/70 mb-2">Compliance Needs</label>
          <input
            type="text"
            name="complianceNeeds"
            value={formData.complianceNeeds}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
            placeholder="e.g., GDPR, HIPAA, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/70 mb-2">Expected Monthly Traffic</label>
          <input
            type="text"
            name="expectedTraffic"
            value={formData.expectedTraffic}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
            placeholder="e.g., 1M+ monthly users"
          />
        </div>
        <div>
          <label className="block text-white/70 mb-2">Global Locations</label>
          <input
            type="text"
            name="globalLocations"
            value={formData.globalLocations}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
            placeholder="Regions where you operate"
          />
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-xl">
        <h3 className="text-white font-semibold mb-4">Enterprise Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="aiIntegration"
              checked={formData.aiIntegration}
              onChange={handleInputChange}
              className="form-checkbox text-[#00f2fe]"
            />
            <span className="text-white/70">AI/ML Integration</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="dataAnalytics"
              checked={formData.dataAnalytics}
              onChange={handleInputChange}
              className="form-checkbox text-[#00f2fe]"
            />
            <span className="text-white/70">Advanced Analytics</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="customDashboard"
              checked={formData.customDashboard}
              onChange={handleInputChange}
              className="form-checkbox text-[#00f2fe]"
            />
            <span className="text-white/70">Custom Dashboard</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="deploymentStrategy"
              checked={formData.deploymentStrategy}
              onChange={handleInputChange}
              className="form-checkbox text-[#00f2fe]"
            />
            <span className="text-white/70">Multi-region Deployment</span>
          </label>
        </div>
      </div>
    </>
  );

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
          <WebDevForm
            tier="Enterprise"
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            additionalFields={additionalFields}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
