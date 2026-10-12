import { useCallback, useState } from 'react';
import { IconMail, IconPhone, IconMapPin, IconSend } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';
import Notification from '../components/Notifications/notification';
import PageShell from '../components/layout/PageShell';
import PageHero from '../components/layout/PageHero';
import Button from '../components/ui/Button';

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

  const closeNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const contactInfo = [
    {
      icon: IconMail,
      title: "Email",
      content: "info@virtara.co.za",
      link: "mailto:info@virtara.co.za",
      description: "Send us an email anytime"
    },
    {
      icon: IconPhone,
      title: "Phone",
      content: "+27 72 327 1040",
      link: "tel:+27723271040",
      description: "Call us for immediate assistance"
    },
    {
      icon: IconMapPin,
      title: "Location",
      content: "16 Hume Road, Johannesburg, 2092",
      link: "https://maps.google.com/?q=16+Hume+Road+Johannesburg+2092",
      description: "Visit our office in Johannesburg"
    }
  ];

  return (
    <PageShell>
      <Helmet>
        <title>Contact Us | Virtara</title>
        <meta name="description" content="Contact Virtara to discuss your website, SEO, or growth project. We respond quickly and can help scope your next digital initiative." />
        <link rel="canonical" href="https://virtara.co.za/contact-us" />
      </Helmet>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />

      <PageHero
        announcement={{ label: 'Get in touch' }}
        title="Let's build something that performs."
        lead="Ready to transform your digital presence? Tell us where you are and where you want to be."
      />

      <section className="pb-24 md:pb-32" aria-label="Contact">
        <div className="shell grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          {/* Direct lines */}
          <ul className="divide-y divide-edge self-start rounded-card border border-edge bg-ink">
            {contactInfo.map(({ icon: Icon, ...info }) => (
              <li key={info.title}>
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-start gap-4 p-5 transition-colors duration-fast hover:bg-white/[0.02]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-edge bg-steel text-frost transition-colors duration-fast group-hover:text-cloud">
                    <Icon size={18} stroke={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-caption text-quiet">{info.title}</span>
                    <span className="mt-0.5 block text-body font-medium text-cloud">{info.content}</span>
                    <span className="mt-1 block text-nav font-normal text-mist">{info.description}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Form */}
          <div className="rounded-card border border-edge bg-charcoal shadow-frame">
            <div className="border-b border-edge px-6 py-5 sm:px-8">
              <h2 className="text-title text-cloud">Send us a message</h2>
              <p className="mt-1 text-nav font-normal text-mist">We typically respond within 24 hours during business days.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="field-label">Name</label>
                  <input id="c-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} className="field-input" required placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="field-label">Email</label>
                  <input id="c-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} className="field-input" required placeholder="you@company.co.za" />
                </div>
              </div>
              <div>
                <label htmlFor="c-subject" className="field-label">Subject</label>
                <input id="c-subject" type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="field-input" required placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="c-message" className="field-label">Message</label>
                <textarea id="c-message" rows="6" name="message" value={formData.message} onChange={handleInputChange} className="field-input resize-y" required placeholder="Tell us about your project…" />
              </div>
              <Button type="submit" size="lg" loading={isLoading} className="w-full font-semibold" icon={<IconSend stroke={1.8} />}>
                {isLoading ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Contact;
