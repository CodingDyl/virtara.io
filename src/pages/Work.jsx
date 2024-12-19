import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: "Virtec Marketing",
      category: "web",
      image: "path_to_virtec_image",
      description: "Complete website redesign and digital transformation",
      technologies: ["React", "TailwindCSS", "Node.js"],
      results: {
        traffic: "+150% Traffic",
        conversion: "+40% Conversion",
        engagement: "+60% Engagement"
      },
      link: "https://virtecmarketing.com"
    },
    // Add more projects here
  ];

  const technologies = [
    { name: "React", icon: "react-icon.svg" },
    { name: "Node.js", icon: "nodejs-icon.svg" },
    { name: "TailwindCSS", icon: "tailwind-icon.svg" },
    // Add more technologies
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Our Creative
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Portfolio
              </span>
            </h1>
            <p className="text-lg text-white/70">
              Explore our latest projects and see how we've helped businesses transform their digital presence.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'web', 'marketing'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full transition-colors ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white' 
                    : 'bg-white/5 text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode='wait'>
              {projects
                .filter(project => activeFilter === 'all' || project.category === activeFilter)
                .map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl bg-white/5"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-white/70 mb-4">{project.description}</p>
                        <div className="flex gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open(project.link, '_blank')}
                          className="px-6 py-2 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                          View Details
                          <FaArrowRight />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Technologies Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Technologies We Use</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <img src={tech.icon} alt={tech.name} className="w-12 h-12 mb-4" />
                  <span className="text-white/70">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Let's Work Together
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Work;
