import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaClock, FaTags } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/sanity';
import { PortableText } from '@portabletext/react';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          title,
          publishedAt,
          body,
          readTime,
          "mainImage": mainImage.asset->url,
          "author": author->name,
          "categories": categories[]->title
        }`;
        
        const post = await client.fetch(query, { slug });
        setPost(post);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#0F0F0F] min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-white text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#0F0F0F] min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-white text-center">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/blog')}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
          </motion.button>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
                <img 
                  src={post.mainImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                <span className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                )}
                {post.author && (
                  <span>By {post.author}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>

              {/* Categories */}
              {post.categories && (
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <FaTags className="w-4 h-4 text-[#00f2fe]" />
                  {post.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <PortableText value={post.body} />
            </motion.div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost; 