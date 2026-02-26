import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaClock, FaTags, FaShare, FaBookmark } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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
      <div className="bg-[#050910] min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center pt-32">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#050910] min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32">
          <Card className="text-center py-20">
            <div className="text-white/70">
              <p className="text-lg mb-2">Post not found</p>
              <p className="text-sm mb-6">The blog post you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/web-development-blog')}>
                Back to Blog
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Virtara Blog`}</title>
        <meta name="description" content={post.excerpt || post.description} />
        <meta name="keywords" content={post.keywords || 'digital marketing, web development, design trends'} />
        <link rel="canonical" href={`https://www.virtara.co.za/web-development-blog/${slug}`} />
      </Helmet>
      <div className="bg-[#050910] min-h-screen">
        <Navbar />

        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Button 
                variant="ghost" 
                onClick={() => navigate('/web-development-blog')}
                className="group"
              >
                <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Blog
              </Button>
            </motion.div>

            {/* Hero Section */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main Image */}
                <Card className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-6 sm:mb-8">
                  <img 
                    src={post.mainImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
                    <Button variant="secondary" size="sm" className="bg-white/10 backdrop-blur-sm">
                      <FaShare className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button variant="secondary" size="sm" className="bg-white/10 backdrop-blur-sm">
                      <FaBookmark className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </Card>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/60 mb-4 sm:mb-6">
                  <Badge variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <FaCalendar className="w-2 h-2 sm:w-3 sm:h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Badge>
                  {post.readTime && (
                    <Badge variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <FaClock className="w-2 h-2 sm:w-3 sm:h-3" />
                      {post.readTime} min read
                    </Badge>
                  )}
                  {post.author && (
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      By {post.author}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  {post.title}
                </h1>

                {/* Categories */}
                {post.categories && (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <FaTags className="w-3 h-3 sm:w-4 sm:h-4 text-[#8df6ff]" />
                    {post.categories.map((category, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="text-xs sm:text-sm"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-none"
              >
                <Card className="p-4 sm:p-6 md:p-8 lg:p-12 bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white prose-a:text-[#8df6ff] prose-strong:text-white prose-code:text-[#8df6ff] prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-[#8df6ff] prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r prose-ul:text-white prose-ol:text-white prose-li:text-white">
                    <PortableText value={post.body} />
                  </div>
                </Card>
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 sm:mt-12"
              >
                <Card className="p-4 sm:p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Share this article</h3>
                      <p className="text-xs sm:text-sm text-white/70">Help others discover this valuable content</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <Button variant="outline" size="sm">
                        <FaShare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Share</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <FaBookmark className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Bookmark</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost; 