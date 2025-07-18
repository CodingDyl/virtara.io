import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../../../components/Notifications/notification';
import sendEmail from "../../../../server/workflow";
import WebDevForm from '../components/WebDevForm';
import { Helmet } from 'react-helmet-async';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    try {
      await sendEmail(
        "New Starter Package Inquiry",
        `
        STARTER PACKAGE INQUIRY
        <br />
        <br />

        Contact Information: <br />
        <br />
        Name: ${formData.name} <br />
        Email: ${formData.email} <br />
        Business Name: ${formData.businessName} <br />
        <br />

        Project Details: <br />
        <br />
        Industry: ${formData.industry} <br />
        Website Goal: ${formData.websiteGoal} <br />
        Main Priority: ${formData.mainPriority} <br />
        Existing Website: ${formData.existingWebsite} <br />
        <br />

        Additional Services Requested: <br />
        <br />
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Starter Website Package | Web Development | Virtara</title>
        <meta name="description" content="Get started with our Starter Website Package. Perfect for small businesses and startups looking to establish a professional online presence." />
        <meta name="keywords" content="starter website package, web development, small business website, startup website" />
        <link rel="canonical" href="https://virtara.co.za/web-development/starter" />
      </Helmet>
      <div className="bg-[#0F0F0F] min-h-screen">
        <Navbar />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        />

        <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <WebDevForm
              tier="Starter"
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Starter;