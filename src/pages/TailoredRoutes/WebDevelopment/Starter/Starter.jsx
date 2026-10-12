import { useState } from 'react';
import PageShell from '../../../../components/layout/PageShell';
import { useNavigate } from 'react-router-dom';
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
    <PageShell>
      <Helmet>
        <title>Starter Website Package | Web Development | Virtara</title>
        <meta name="description" content="Get started with our Starter Website Package. Perfect for small businesses and startups looking to establish a professional online presence." />
        <meta name="keywords" content="starter website package, web development, small business website, startup website" />
        <link rel="canonical" href="https://virtara.co.za/web-development/starter" />
      </Helmet>
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        />

        <section className="relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-glow" />
          <div className="shell relative">
            <WebDevForm
              tier="Starter"
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </section>

    </PageShell>
  );
};

export default Starter;