import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaCalendarAlt, FaFileAlt, FaChartLine, FaHome } from 'react-icons/fa';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Link } from 'react-router-dom';
import Badge from '../../../../components/ui/Badge';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import { Helmet } from 'react-helmet-async';

const ProfThankYou = () => {
  const nextSteps = [
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: "Schedule Your Consultation",
      description: "We'll be reaching out within 24 hours to schedule your free project consultation."
    },
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "Project Planning",
      description: "Our team will analyze your requirements and create a detailed project roadmap."
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Design & Development",
      description: "We'll start building your website with regular updates and feedback sessions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Thank You | Professional Package | Virtara</title>
        <meta name="description" content="Thank you for choosing our Professional Website Package. We'll be in touch within 24 hours to discuss your project." />
        <link rel="canonical" href="https://virtara.co.za/web-development/professional/thank-you" />
      </Helmet>
      <div className="bg-[#050910] min-h-screen">
        <Navbar />

        <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Success Message */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="w-12 h-12 text-white" />
                </div>
                <Badge variant="outline" className="mb-4">
                  Submission Successful
                </Badge>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-8">
                Thank You for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]">
                  {" "}Choosing Us!
                </span>
              </h1>
              
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12">
                We're excited to help you create a powerful digital presence with our Professional Website Package.
              </p>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
              >
                {nextSteps.map((step, index) => (
                  <Card key={index} className="text-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] rounded-full flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {step.description}
                    </p>
                  </Card>
                ))}
              </motion.div>

              {/* Additional Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <Card className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    While You Wait
                  </h2>
                  <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                    Check out these resources to learn more about our web development process:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" size="lg">
                      Our Process
                      <FaArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg">
                      Portfolio
                      <FaArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Return to Home */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  variant="ghost" 
                  onClick={() => window.location.href = '/'}
                  className="group"
                >
                  <FaHome className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Return to Homepage
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProfThankYou;
