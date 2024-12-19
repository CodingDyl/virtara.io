import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaClock, FaTags, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'web development', 'digital marketing', 'design', 'technology'];

  const blogPosts = [
    {
      title: "The Future of Web Development: What's Next in 2024",
      excerpt: "Explore the latest trends and technologies shaping the future of web development, from AI integration to advanced frameworks.",
      category: "web development",
      readTime: "5 min read",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
      tags: ["React", "AI", "Web3"]
    },
    {
      title: "Mastering Digital Marketing in the AI Era",
      excerpt: "Learn how artificial intelligence is revolutionizing digital marketing strategies and how to stay ahead of the curve.",
      category: "digital marketing",
      readTime: "7 min read",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
      tags: ["Marketing", "AI", "Strategy"]
    },
    {
      title: "Essential UI/UX Design Principles for 2024",
      excerpt: "Discover the key design principles that will help you create more engaging and user-friendly digital experiences.",
      category: "design",
      readTime: "6 min read",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1626785774625-0b1c09197357",
      tags: ["UI/UX", "Design", "Trends"]
    },
    // Add more dummy blog posts as needed
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

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
              Insights & 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Perspectives
              </span>
            </h1>
            <p className="text-lg text-white/70">
              Explore our latest thoughts on technology, design, and digital innovation
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full capitalize transition-colors ${
                    activeCategory === category 
                      ? 'bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <AnimatePresence mode='wait'>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-white/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <FaTags className="w-4 h-4 text-[#00f2fe]" />
                      {post.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-sm text-white/60 bg-white/5 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-[#00f2fe] font-medium"
                    >
                      Read More
                      <FaArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/70 mb-8">
              Subscribe to our newsletter for the latest insights and articles
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white focus:border-[#4ECDC4] focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;