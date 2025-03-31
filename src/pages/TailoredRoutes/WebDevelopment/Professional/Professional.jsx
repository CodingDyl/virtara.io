import React, { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import Notification from '../../../../components/Notifications/notification';
import WebDevForm from '../components/WebDevForm';
import sendEmail from "../../../../server/workflow";
import { useNavigate } from 'react-router-dom';

const Professional = () => {
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
    brandColors: '',
    targetAudience: '',
    competitors: '',
    desiredFeatures: [],
    customIntegrations: [],
    seoStrategy: false,
    contentStrategy: false,
    analyticsSetup: false,
    maintenancePlan: false
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'desiredFeatures' || name === 'customIntegrations') {
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
        "New Professional Package Inquiry",
        `
        PROFESSIONAL PACKAGE INQUIRY

        Contact Information:
        Name: ${formData.name}
        Email: ${formData.email}
        Business Name: ${formData.businessName}

        Project Details:
        Industry: ${formData.industry}
        Website Goal: ${formData.websiteGoal}
        Main Priority: ${formData.mainPriority}
        Brand Colors: ${formData.brandColors}
        Target Audience: ${formData.targetAudience}

        Additional Services Requested:
        - SEO Strategy: ${formData.seoStrategy ? 'Yes' : 'No'}
        - Content Strategy: ${formData.contentStrategy ? 'Yes' : 'No'}
        - Analytics Setup: ${formData.analyticsSetup ? 'Yes' : 'No'}
        - Maintenance Plan: ${formData.maintenancePlan ? 'Yes' : 'No'}
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

  // Additional fields specific to Professional tier
  const additionalFields = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-white/70 mb-2">Brand Colors</label>
        <input
          type="text"
          name="brandColors"
          value={formData.brandColors}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
          placeholder="e.g., #FF0000, #00FF00"
        />
      </div>
      <div>
        <label className="block text-white/70 mb-2">Target Audience</label>
        <input
          type="text"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
          placeholder="Describe your ideal customer"
        />
      </div>
    </div>
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
            tier="Professional"
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

export default Professional;
