import { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../../components/Notifications/notification';
import submitLead from "../../../../server/submitLead";
import WebDevForm from '../components/WebDevForm';
import { Helmet } from 'react-helmet-async';

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
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitLead(
        'enterprise',
        { name: formData.name, email: formData.email, phone: formData.phone, company: formData.businessName, website: formData.existingWebsite, hp: e.target.elements?.hp?.value },
        {
          industry: formData.industry,
          websiteGoal: formData.websiteGoal,
          mainPriority: formData.mainPriority,
          seoOptimization: formData.seoOptimization,
          contentWriting: formData.contentWriting,
          maintenance: formData.maintenance,
        }
      );

      setNotification({
        message: "Thanks for your interest! We'll reach out within 24 hours to discuss your enterprise project.",
        type: 'success',
        isVisible: true
      });

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        navigate('/enterprise/thank-you');
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
        <title>Enterprise Website Package | Web Development | Virtara</title>
        <meta name="description" content="Get our Enterprise Website Package. Ideal for large-scale projects with complex requirements and custom solutions." />
        <meta name="keywords" content="enterprise website package, web development, large-scale projects, custom solutions" />
        <link rel="canonical" href="https://virtara.co.za/web-development/enterprise" />
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
            <WebDevForm
              tier="Enterprise"
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

export default Enterprise;
