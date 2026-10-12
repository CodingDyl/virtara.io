import LegalPage from '../../components/layout/LegalPage';

const PrivacyPolicy = () => (
  <LegalPage
    metaTitle="Privacy Policy | Virtara"
    metaDescription="Read Virtara's privacy policy to understand how we collect, use, and protect your personal information."
    canonical="https://virtara.co.za/legal/privacy-policy"
    path="/legal/privacy-policy"
    title="Privacy policy"
    lead="How we collect, use and protect your personal information."
    footer={<p>Effective date: {new Date().toLocaleDateString()}</p>}
  >

              <h2>1. Introduction</h2>
              <p>
                Thank you for visiting our website. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you access or use our website and any related services.
              </p>

              <h2>2. Information We Collect</h2>
              
              <h3>2.1. Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us, such as:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business information</li>
                <li>Project requirements and preferences</li>
              </ul>

              <h3>2.2. Non-Personal Information</h3>
              <p>
                We automatically collect certain non-personal information when you visit our website, including:
              </p>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul>
                <li>To provide and maintain our services</li>
                <li>To communicate with you about our services</li>
                <li>To improve our website and user experience</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To detect and prevent fraud</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              <p>
                Our security measures include:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage facilities</li>
                <li>Regular security training for staff</li>
              </ul>

              <h2>5. Third-Party Services</h2>
              <p>
                We may use third-party service providers to help us operate our website and services. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated to protect your information.
              </p>
              <p>
                Third-party services we use may include:
              </p>
              <ul>
                <li>Analytics services (e.g., Google Analytics)</li>
                <li>Payment processors</li>
                <li>Email service providers</li>
                <li>Hosting services</li>
              </ul>

              <h2>6. User Rights</h2>
              <p>
                You have the following rights regarding your personal information:
              </p>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>

              <h2>7. Cookie Policy</h2>
              <p>
                We use cookies and similar tracking technologies to improve your browsing experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul>
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve our services</li>
                <li>Provide personalized content</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of our website.
              </p>

              <h2>8. Changes to Privacy Policy</h2>
              <p>
                We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this policy.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our website after any modifications indicates your acceptance of the updated Privacy Policy.
              </p>

              <h2>9. Contact Information</h2>
              <p>
                If you have any questions, concerns, or requests related to this Privacy Policy or our privacy practices, please contact us at:
              </p>
              
              <div>
                <div>
                  <p>Virtara (PTY) LTD</p>
                  <p>South Africa, Johannesburg, 2092</p>
                  <p>Email: <a href="mailto:info@virtara.co.za">info@virtara.co.za</a></p>
                  <p>Phone: +27 72 327 1040</p>
                </div>
              </div>

  </LegalPage>
);

export default PrivacyPolicy;
