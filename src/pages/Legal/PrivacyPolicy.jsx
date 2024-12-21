import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Privacy
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Policy
              </span>
            </h1>

            <div className="prose prose-lg prose-invert">
              <p className="text-white/70 text-lg mb-8">
                Effective Date: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">1. Introduction</h2>
              <p className="text-white/70 mb-6">
                Thank you for visiting our website. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you access or use our website and any related services.
              </p>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl text-white font-semibold mt-8 mb-3">2.1. Personal Information</h3>
              <p className="text-white/70 mb-6">
                We may collect personal information that you voluntarily provide to us, such as:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business information</li>
                <li>Project requirements and preferences</li>
              </ul>

              <h3 className="text-xl text-white font-semibold mt-8 mb-3">2.2. Non-Personal Information</h3>
              <p className="text-white/70 mb-6">
                We automatically collect certain non-personal information when you visit our website, including:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">3. How We Use Your Information</h2>
              <p className="text-white/70 mb-6">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>To provide and maintain our services</li>
                <li>To communicate with you about our services</li>
                <li>To improve our website and user experience</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To detect and prevent fraud</li>
              </ul>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">4. Data Security</h2>
              <p className="text-white/70 mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              <p className="text-white/70 mb-6">
                Our security measures include:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage facilities</li>
                <li>Regular security training for staff</li>
              </ul>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">5. Third-Party Services</h2>
              <p className="text-white/70 mb-6">
                We may use third-party service providers to help us operate our website and services. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated to protect your information.
              </p>
              <p className="text-white/70 mb-6">
                Third-party services we use may include:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>Analytics services (e.g., Google Analytics)</li>
                <li>Payment processors</li>
                <li>Email service providers</li>
                <li>Hosting services</li>
              </ul>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">6. User Rights</h2>
              <p className="text-white/70 mb-6">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">7. Cookie Policy</h2>
              <p className="text-white/70 mb-6">
                We use cookies and similar tracking technologies to improve your browsing experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside text-white/70 mb-6 ml-4">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve our services</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="text-white/70 mb-6">
                You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of our website.
              </p>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">8. Changes to Privacy Policy</h2>
              <p className="text-white/70 mb-6">
                We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this policy.
              </p>
              <p className="text-white/70 mb-6">
                We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our website after any modifications indicates your acceptance of the updated Privacy Policy.
              </p>

              <h2 className="text-2xl text-white font-semibold mt-12 mb-4">9. Contact Information</h2>
              <p className="text-white/70 mb-6">
                If you have any questions, concerns, or requests related to this Privacy Policy or our privacy practices, please contact us at:
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 p-6 rounded-2xl bg-white/5"
              >
                <div className="text-white/70">
                  <p className="mb-2">Virtara (PTY) LTD</p>
                  <p className="mb-2">South Africa, Johannesburg, 2092</p>
                  <p className="mb-2">Email: <a href="mailto:info@virtara.co.za" className="text-[#00f2fe] hover:text-[#ff00e5] transition-colors">info@virtara.co.za</a></p>
                  <p>Phone: +27 (072) 327 1040</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;