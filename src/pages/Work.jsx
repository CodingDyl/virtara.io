import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaReact, FaNodeJs, FaJava, FaApple, FaAndroid, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTailwindcss, SiSanity, SiFirebase, SiThreedotjs, SiFlutter, SiAndroidstudio } from 'react-icons/si';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { virtec, vaja, mpower, clarity, aureya } from '../assets';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Work = () => {
  const projects = [
    {
      title: "Virtec Marketing",
      image: virtec,
      description: "Complete website redesign and digital transformation",
      technologies: ["React", "TailwindCSS", "Node.js"],
      results: {
        traffic: "+150% Traffic",
        conversion: "+40% Conversion",
        engagement: "+60% Engagement"
      },
      link: "https://virtec.vercel.app",
      category: "Marketing"
    },
    {
      title: "Vaja",
      image: vaja,
      description: "Modern web presence for construction excellence",
      technologies: ["React", "TailwindCSS", "Three.js"],
      results: {
        traffic: "+120% Traffic",
        conversion: "+35% Conversion",
        engagement: "+45% Engagement"
      },
      link: "https://vaja-web.vercel.app",
      category: "Construction"
    },
    {
      title: "MPower Ratings",
      image: mpower,
      description: "Digital marketing campaign and brand refresh",
      technologies: ["React", "Firebase", "Node.js"],
      results: {
        traffic: "+200% Traffic",
        conversion: "+50% Conversion",
        engagement: "+75% Engagement"
      },
      link: "https://www.mpowerratings.co.za",
      category: "Finance"
    },
    {
      title: "Aureya Marketing",
      image: aureya,
      description: "Modern marketing agency website with lead generation",
      technologies: ["React", "TailwindCSS", "Sanity"],
      results: {
        traffic: "+180% Traffic",
        conversion: "+45% Conversion",
        engagement: "+65% Engagement"
      },
             link: "https://www.aureya.co.za",
      category: "Marketing"
    },
    {
      title: "Clarity Engineering",
      image: clarity,
      description: "Professional consulting engineering firm website",
      technologies: ["React", "TailwindCSS", "Three.js"],
      results: {
        traffic: "+140% Traffic",
        conversion: "+38% Conversion",
        engagement: "+55% Engagement"
      },
             link: "https://www.clarityce.co.za",
      category: "Engineering"
    }
  ];

  const technologies = [
    { name: "React", Icon: FaReact, color: "#61DAFB" },
    { name: "Node.js", Icon: FaNodeJs, color: "#339933" },
    { name: "TailwindCSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Sanity", Icon: SiSanity, color: "#F03A2B" },
    { name: "Java", Icon: FaJava, color: "#ED8B00" },
    { name: "Three.js", Icon: SiThreedotjs, color: "#000000" },
    { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
    { name: "Android Studio", Icon: SiAndroidstudio, color: "#3DDC84" },
    { name: "iOS Development", Icon: FaApple, color: "#000000" },
  ];

  return (
    <>
      <Helmet>
        <title>Our Portfolio | Digital Projects & Success Stories</title>
        <meta name="description" content="Explore our portfolio of successful digital projects. See how we've helped businesses transform their online presence through web design, development, and marketing." />
        <meta name="keywords" content="digital portfolio, web design portfolio, development projects, digital marketing case studies" />
        <link rel="canonical" href="https://virtara.co.za/portfolio" />
      </Helmet>
      <div className="bg-[#0F0F0F] min-h-screen">
        <Navbar />

        <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-8 md:mb-16 px-4"
            >
              <Badge variant="primary" size="lg" className="mb-4 sm:mb-6">
                Our Portfolio
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Our Creative
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                  {" "}Portfolio
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed px-2">
                Explore our latest projects and see how we've helped businesses transform their digital presence.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2">
              <AnimatePresence mode='wait'>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card variant="default" className="group cursor-pointer overflow-hidden" hover={true}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-[180px] sm:h-[200px] md:h-[250px] lg:h-[300px] object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <Badge variant="outline" size="sm" className="text-xs sm:text-sm">
                                {project.category}
                              </Badge>
                              <FaExternalLinkAlt className="text-white/70 text-xs sm:text-sm" />
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{project.title}</h3>
                            <p className="text-xs sm:text-sm md:text-base text-white/70 mb-2 sm:mb-3 md:mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                              {project.technologies.map((tech, i) => (
                                <span key={i} className="px-1 sm:px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4">
                              {Object.entries(project.results).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-[#00f2fe] text-xs font-semibold">{value}</div>
                                  <div className="text-white/50 text-xs capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                            <Button
                              variant="gradient"
                              size="sm"
                              className="w-full"
                              onClick={() => window.open(project.link, '_blank')}
                              showArrow={true}
                            >
                              View Project
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Technologies Section */}
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-12"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">Technologies We Use</h2>
                <p className="text-sm sm:text-base text-white/70">Cutting-edge tools and frameworks for modern development</p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card variant="glass" className="h-full text-center group" hover={true}>
                      <Card.Content>
                        <tech.Icon 
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mb-2 sm:mb-3 md:mb-4 mx-auto transition-all duration-300 group-hover:scale-110" 
                          style={{ color: tech.color }}
                        />
                        <span className="text-xs sm:text-sm md:text-base text-white/70 group-hover:text-white transition-colors duration-300">
                          {tech.name}
                        </span>
                      </Card.Content>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2"
            >
              <Card variant="elevated" className="p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00f2fe] mb-1 sm:mb-2">50+</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/70">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff00e5] mb-1 sm:mb-2">95%</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/70">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00f2fe] mb-1 sm:mb-2">200%</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/70">Average Traffic Increase</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff00e5] mb-1 sm:mb-2">24/7</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/70">Support Available</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-2"
            >
              <Card variant="glass" className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6">Ready to Start Your Project?</h2>
                <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Let's create something amazing together. Your vision, our expertise.
                </p>
                <Link to="/start-your-project">
                  <Button
                    variant="gradient"
                    size="lg"
                    showArrow={true}
                  >
                    Let's Work Together
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Work;
