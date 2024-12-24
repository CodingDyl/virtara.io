import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaClock, FaTags, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/sanity';
import { Link } from 'react-router-dom';

const Blog = () => {
  const categories = ['all', 'Trends', 'Digital Marketing', 'Technology', 'AI'];
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] {
          _id,
          title,
          publishedAt,
          excerpt,
          readTime,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "author": author->name,
          "categories": categories[]->title
        }`;
        
        const posts = await client.fetch(query);
        console.log('Fetched posts with categories:', posts);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => 
        post.categories && post.categories.some(category => 
          category === activeCategory
        )
      );

  console.log('Active category:', activeCategory);
  console.log('Filtered posts:', filteredPosts);

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-8 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-8">
              Insights & 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Perspectives
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/70 px-4">
              Explore our latest thoughts on technology, design, and digital innovation
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8 md:mb-16 px-2">
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full capitalize transition-colors ${
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
          {loading ? (
            <div className="text-center text-white">
              <p>Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-white">
              <p>No posts found in this category.</p>
            </div>
          ) : (
            <AnimatePresence mode='wait'>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl md:rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={post.mainImage} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        {post.author && (
                          <span className="flex items-center gap-1">
                            By {post.author}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      {post.categories && (
                        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                          <FaTags className="w-4 h-4 text-[#00f2fe]" />
                          {post.categories.map((category, categoryIndex) => (
                            <span 
                              key={categoryIndex}
                              className="text-xs sm:text-sm text-white/60 bg-white/5 px-2 py-1 rounded"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link to={`/blog/${post.slug}`}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-[#00f2fe] font-medium"
                        >
                          Read More
                          <FaArrowRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto mt-12 md:mt-20 text-center px-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              Stay Updated
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-6 md:mb-8">
              Subscribe to our newsletter for the latest insights and articles
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm md:text-base focus:border-[#4ECDC4] focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white rounded-full font-medium text-sm md:text-base"
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