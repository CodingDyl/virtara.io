import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';
import Notification from '../components/Notifications/notification';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await emailjs.send(
        'service_xhhzm3k',
        'template_bib6h27',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'tlvH-LCyKA7B18wvK'
      );
      
      setNotification({
        message: 'Message sent successfully! We will get back to you soon.',
        type: 'success',
        isVisible: true
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({
        message: 'Failed to send message. Please try again later.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      content: "info@virtara.co.za",
      link: "mailto:info@virtara.co.za",
      description: "Send us an email anytime"
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone",
      content: "+27 (072) 327 1040",
      link: "tel:+27723271040",
      description: "Call us for immediate assistance"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Location",
      content: "16 Hume Road, Johannesburg, 2092",
      link: "https://maps.google.com",
      description: "Visit our office in Johannesburg"
    }
  ];

  return (
    <div className="bg-[#050910] min-h-screen">
      <Helmet>
        <title>Contact Us | Virtara</title>
        <meta name="description" content="Contact Virtara to discuss your website, SEO, or growth project. We respond quickly and can help scope your next digital initiative." />
        <link rel="canonical" href="https://virtara.co.za/contact-us" />
      </Helmet>
      <Navbar />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />

      <section className="min-h-screen pt-32 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center mb-12"
            >
              <Badge variant="primary" size="lg" className="mb-6">
                Get In Touch
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-8">
                Let's Create Something
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                  {" "}Amazing
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your digital presence? We're here to help bring your vision to life.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 md:mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card variant="glass" className="h-full group cursor-pointer" hover={true}>
                    <Card.Content>
                      <motion.a
                        href={info.link}
                        className="block"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-[#8df6ff] group-hover:text-[#4ea4ff] transition-colors duration-300 mb-4">
                          {info.icon}
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">{info.title}</h3>
                        <p className="text-white/70 mb-2">{info.content}</p>
                        <p className="text-white/50 text-sm">{info.description}</p>
                      </motion.a>
                    </Card.Content>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card variant="elevated" className="p-6 sm:p-8">
                <Card.Header>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Send us a Message</h2>
                    <p className="text-white/70">We'd love to hear from you</p>
                  </div>
                </Card.Header>
                
                <Card.Content>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/70 mb-2 font-medium">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#8df6ff] focus:outline-none transition-all duration-300 focus:bg-white/10"
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2 font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#8df6ff] focus:outline-none transition-all duration-300 focus:bg-white/10"
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 font-medium">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#8df6ff] focus:outline-none transition-all duration-300 focus:bg-white/10"
                        required
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 font-medium">Message</label>
                      <textarea
                        rows="6"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#8df6ff] focus:outline-none transition-all duration-300 focus:bg-white/10 resize-none"
                        required
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      disabled={isLoading}
                      className="w-full"
                      icon={isLoading ? null : <FaPaperPlane />}
                      showArrow={!isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <LoadingSpinner size="sm" variant="default" />
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </Card.Content>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center mt-12"
            >
              <p className="text-white/60 text-sm">
                We typically respond within 24 hours during business days.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
