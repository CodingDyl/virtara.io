import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBuilding,
  FaCalendar,
  FaCheckCircle,
  FaCog,
  FaComments,
  FaEnvelope,
  FaGlobe,
  FaPhone
} from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Notification from "../components/Notifications/notification";
import sendEmail from "../server/workflow";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function StartaProject() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget: "",
    service: "",
    message: ""
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      budget: "",
      service: "",
      message: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(
        `Start a Project Request: ${formData.service || "General Inquiry"}`,
        `
        Name: ${formData.name}, <br />
        Email: ${formData.email}, <br />
        Phone: ${formData.phone}, <br />
        Company: ${formData.company}, <br />
        Website: ${formData.website}, <br />
        Budget: ${formData.budget}, <br />
        Service: ${formData.service}, <br />
        Message: ${formData.message}
      `
      );

      resetForm();
      setNotification({
        message: "Email sent successfully!",
        type: "success",
        isVisible: true
      });
      navigate("/resources/start-a-project/thank-you");
    } catch (error) {
      console.error(error);
      setNotification({
        message: "Failed to send email. Please try again later.",
        type: "error",
        isVisible: true
      });
      resetForm();
    }
  };

  const services = [
    {
      category: "Web Development",
      options: ["Custom Website Design", "E-Commerce Solutions", "Web Application Development", "Website Maintenance"]
    },
    {
      category: "Digital Marketing",
      options: ["Search Engine Optimization", "Social Media Marketing", "Paid Advertising", "Email Marketing"]
    },
    {
      category: "Brand Strategy",
      options: ["Brand Identity Design", "Brand Guidelines", "Brand Messaging", "Visual Identity"]
    }
  ];

  const projectSizes = [
    "Starter (R8,000 - R25,000)",
    "Growth (R25,000 - R65,000)",
    "Scale (R65,000 - R150,000)",
    "Enterprise (R150,000+)"
  ];

  const benefits = [
    {
      icon: <FaCalendar className="w-5 h-5" />,
      title: "Fast Discovery",
      description: "A practical strategy call focused on revenue opportunities and implementation speed."
    },
    {
      icon: <FaCog className="w-5 h-5" />,
      title: "Tailored Scope",
      description: "No one-size package. We scope around outcomes, team capacity, and budget reality."
    },
    {
      icon: <FaComments className="w-5 h-5" />,
      title: "Direct Communication",
      description: "Direct access to your strategist with transparent milestones from day one."
    }
  ];

  const serviceOptions = services.flatMap((group) => group.options);

  return (
    <>
      <Helmet>
        <title>Start Your Digital Project | Web Development & Marketing Solutions</title>
        <meta
          name="description"
          content="Ready to start your digital project? Let's collaborate to create innovative web solutions and marketing strategies that drive results for your business."
        />
        <meta
          name="keywords"
          content="start project, web development project, digital marketing services, custom solutions"
        />
        <link rel="canonical" href="https://virtara.co.za/starta-project" />
      </Helmet>

      <main className="bg-[#050910] min-h-screen text-white virtara-body">
        <Navbar />

        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={closeNotification}
        />

        <section className="pt-32 md:pt-38 pb-14 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_6%,rgba(20,99,255,0.28),transparent_38%),radial-gradient(circle_at_82%_4%,rgba(96,219,255,0.2),transparent_34%),linear-gradient(180deg,rgba(5,9,16,0.45),rgba(5,9,16,1))]" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl"
            >
              <Badge variant="primary" size="lg" className="mb-5 px-5 py-2.5">
                <FaComments className="w-3.5 h-3.5 mr-2" />
                Strategy-Led Project Intake
              </Badge>
              <h1 className="virtara-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.94] tracking-tight mb-6">
                Start a Project
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] via-[#6fc2ff] to-[#4ea4ff]">
                  Built for Measurable Growth
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#c5d7ff] max-w-3xl leading-relaxed">
                Tell us what you want to achieve and we will map the highest-leverage roadmap for your next phase. This is a
                consultation, not a generic quote form.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-16 md:pb-24 relative">
          <div className="pointer-events-none absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[#1f67ff]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-12 right-8 h-48 w-48 rounded-full bg-[#75e8ff]/15 blur-3xl" />
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="xl:col-span-4 space-y-5 xl:sticky xl:top-28"
              >
                <Card
                  className="border border-[#74a7ff]/30 bg-[linear-gradient(135deg,rgba(8,17,35,0.96),rgba(8,16,33,0.62))]"
                  hover={false}
                >
                  <Card.Content className="md:p-7 space-y-5">
                    <h2 className="text-2xl font-semibold">What Happens Next</h2>
                    <div className="space-y-4">
                      {benefits.map((benefit) => (
                        <div key={benefit.title} className="flex gap-3.5">
                          <div className="mt-1 text-[#8df6ff] shrink-0">{benefit.icon}</div>
                          <div>
                            <p className="font-medium text-white">{benefit.title}</p>
                            <p className="text-sm text-[#b9cdf8]">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>

                <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8fb8ff] mb-3">Typical Timeline</p>
                  <div className="space-y-2.5 text-sm text-[#d3e1ff]">
                    <p className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#8df6ff]" />
                      Submit strategic brief
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#8df6ff]" />
                      45-minute discovery call
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#8df6ff]" />
                      Growth roadmap + proposal
                    </p>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#6fa9ff]/20 bg-[linear-gradient(145deg,rgba(111,169,255,0.16),rgba(4,11,21,0.35))] p-5">
                  <p className="text-sm text-[#d6e5ff] leading-relaxed">
                    Most clients begin with a focused sprint and scale into monthly optimization once baseline wins are proven.
                  </p>
                  <p className="text-[#8df6ff] text-sm mt-4 inline-flex items-center gap-2">
                    <FaArrowRight />
                    Average response time: under 24 hours
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="xl:col-span-8"
              >
                <Card
                  className="border border-[#74a7ff]/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
                  hover={false}
                >
                  <Card.Content className="p-6 md:p-8 lg:p-10">
                    <div className="mb-7">
                      <h2 className="text-2xl md:text-3xl virtara-display tracking-tight text-white mb-2">
                        Book Your Strategy Audit
                      </h2>
                      <p className="text-[#b8cdf8] text-sm md:text-base">
                        Share your context below and we will reply with next steps and a fit-for-purpose plan.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-white/85 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-white placeholder:text-white/45 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white/85 mb-2">Email Address *</label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              className="w-full pl-11 pr-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-white placeholder:text-white/45 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white/85 mb-2">Phone Number</label>
                          <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+27 (0) 12 345 6789"
                              className="w-full pl-11 pr-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-white placeholder:text-white/45 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white/85 mb-2">Company Name</label>
                          <div className="relative">
                            <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Your Company"
                              className="w-full pl-11 pr-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-white placeholder:text-white/45 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-white/85 mb-2">Website (if existing)</label>
                          <div className="relative">
                            <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              placeholder="https://yourwebsite.com"
                              className="w-full pl-11 pr-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-white placeholder:text-white/45 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white/85 mb-3">Project Budget Range *</p>
                        <div className="flex flex-wrap gap-2.5">
                          {projectSizes.map((size) => {
                            const active = formData.budget === size;
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, budget: size }))}
                                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 border ${
                                  active
                                    ? "bg-gradient-to-r from-[#8df6ff]/30 to-[#4ea4ff]/30 border-[#8df6ff]/60 text-white shadow-[0_8px_28px_rgba(67,174,255,0.25)]"
                                    : "bg-white/[0.04] border-white/15 text-[#c7d8ff] hover:border-[#8df6ff]/40 hover:bg-white/[0.08]"
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          readOnly
                          required
                          className="sr-only"
                          aria-hidden="true"
                          tabIndex={-1}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white/85 mb-3">Primary Service *</p>
                        <div className="flex flex-wrap gap-2.5">
                          {serviceOptions.map((option) => {
                            const active = formData.service === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, service: option }))}
                                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 border ${
                                  active
                                    ? "bg-gradient-to-r from-[#8df6ff]/30 to-[#4ea4ff]/30 border-[#8df6ff]/60 text-white shadow-[0_8px_28px_rgba(67,174,255,0.25)]"
                                    : "bg-white/[0.04] border-white/15 text-[#c7d8ff] hover:border-[#8df6ff]/40 hover:bg-white/[0.08]"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                        <input
                          type="text"
                          name="service"
                          value={formData.service}
                          readOnly
                          required
                          className="sr-only"
                          aria-hidden="true"
                          tabIndex={-1}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/85 mb-2">Project Details *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="What outcomes do you want in the next 3-6 months? Include your goals, timeline, and priorities."
                          rows="6"
                          className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-white placeholder:text-white/45 focus:outline-none focus:border-[#8df6ff] focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300 resize-none"
                          required
                        />
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Button type="submit" size="lg" variant="gradient" className="px-10" showArrow>
                          Book a Strategy Audit
                        </Button>
                        <p className="text-xs text-[#9fb8eb]">
                          By submitting, you agree to be contacted regarding your strategy request.
                        </p>
                      </div>
                    </form>
                  </Card.Content>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default StartaProject;
