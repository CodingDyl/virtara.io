import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaClock, FaTags, FaArrowRight, FaRss } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/sanity';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast, Toaster } from 'react-hot-toast';
import { subscribeToNewsletter } from '../config/firebase';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Blog = () => {
  const categories = ['all', 'Trends', 'Digital Marketing', 'Technology', 'AI'];
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        toast.success(result.message);
        setEmail(''); // Clear the input
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Digital Insights Blog | Web Development & Marketing Tips</title>
        <meta name="description" content="Stay updated with the latest insights in web development, digital marketing, and design trends. Expert tips and industry knowledge to grow your business." />
        <meta name="keywords" content="digital marketing blog, web development tips, design trends, SEO insights, business growth" />
        <link rel="canonical" href="https://virtara.co.za/blog" />
      </Helmet>
      <Toaster position="top-right" />
      <div className="bg-[#0F0F0F] min-h-screen">
        <Navbar />

        <section className="min-h-screen pt-32 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-8 md:mb-16"
            >
              <div className="flex justify-center mb-6">
                <Badge variant="outline" className="text-sm">
                  <FaRss className="w-4 h-4 mr-2" />
                  Latest Insights
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-8">
                Insights & 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                  {" "}Perspectives
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/70 px-4 max-w-2xl mx-auto">
                Explore our latest thoughts on technology, design, and digital innovation
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-8 md:mb-16 px-2"
            >
              <div className="inline-flex flex-wrap gap-2 justify-center bg-white/5 backdrop-blur-sm rounded-full p-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full capitalize transition-all duration-300 ${
                      activeCategory === category 
                        ? 'bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white shadow-lg shadow-[#00f2fe]/25' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="text-center py-20">
                <div className="text-white/70">
                  <p className="text-lg mb-2">No posts found in this category.</p>
                  <p className="text-sm">Try selecting a different category or check back later.</p>
                </div>
              </Card>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden hover:bg-white/10 transition-all duration-300">
                        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-xl">
                          <img 
                            src={post.mainImage} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6">
                          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/60 mb-4">
                            <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                              <FaCalendar className="w-3 h-3" />
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            {post.author && (
                              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                                By {post.author}
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00f2fe] transition-colors duration-300">
                            {post.title}
                          </h2>
                          {post.categories && (
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              <FaTags className="w-4 h-4 text-[#00f2fe]" />
                              {post.categories.map((category, categoryIndex) => (
                                <Badge 
                                  key={categoryIndex}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <Link to={`/web-development-blog/${post.slug}`}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full group-hover:bg-[#00f2fe]/10 group-hover:text-[#00f2fe] transition-all duration-300"
                            >
                              Read More
                              <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto mt-16 md:mt-24"
            >
              <Card className="text-center p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                <Badge variant="outline" className="mb-4">
                  Stay Updated
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                  Never Miss an Insight
                </h2>
                <p className="text-sm md:text-base text-white/70 mb-6 md:mb-8">
                  Subscribe to our newsletter for the latest insights and articles
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm md:text-base focus:border-[#00f2fe] focus:outline-none focus:ring-2 focus:ring-[#00f2fe]/20 transition-all duration-300"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;