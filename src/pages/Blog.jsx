import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaRss, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/sanity';
import { subscribeToNewsletter } from '../config/firebase';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const categories = ['all', 'Trends', 'Digital Marketing', 'Technology', 'AI'];

function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
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
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts;

    return blogPosts.filter((post) =>
      post.categories?.some((category) => category === activeCategory)
    );
  }, [activeCategory, blogPosts]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
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
        setEmail('');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog | Digital Strategy, SEO & Growth Insights</title>
        <meta
          name="description"
          content="Read the latest Virtara insights on SEO, digital strategy, web performance, and growth systems for modern businesses."
        />
        <meta
          name="keywords"
          content="digital marketing blog, SEO insights, web development strategy, growth marketing"
        />
        <link rel="canonical" href="https://virtara.co.za/web-development-blog" />
      </Helmet>

      <Toaster position="top-right" />

      <main className="bg-[#050910] min-h-screen text-white virtara-body">
        <Navbar />

        <section className="pt-32 md:pt-36 pb-14 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(20,99,255,0.28),transparent_38%),radial-gradient(circle_at_78%_5%,rgba(96,219,255,0.2),transparent_34%)]" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-5xl mx-auto text-center"
            >
              <Badge variant="primary" size="lg" className="mb-5">
                <FaRss className="w-3.5 h-3.5 mr-2" />
                Insights Feed
              </Badge>
              <h1 className="virtara-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                Clarity for Teams Building
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]"> Digital Growth</span>
              </h1>
              <p className="text-lg md:text-xl text-[#c2d4ff] max-w-3xl mx-auto leading-relaxed">
                Tactical insights on web strategy, SEO systems, conversion architecture and demand generation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm sm:text-base capitalize transition-all duration-300 border ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-[#04142d] border-transparent font-semibold'
                      : 'bg-white/[0.03] text-[#bfd2fb] border-white/15 hover:bg-white/[0.08]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="max-w-4xl mx-auto text-center border border-white/10 bg-white/[0.03] py-16">
                <Card.Content>
                  <p className="text-lg text-[#d5e2ff] mb-2">No posts found in this category.</p>
                  <p className="text-sm text-[#9cb7eb]">Try another category or check back soon.</p>
                </Card.Content>
              </Card>
            ) : (
              <AnimatePresence mode="wait">
                <div className="max-w-6xl mx-auto space-y-6">
                  {featuredPost ? (
                    <motion.article
                      key={`featured-${featuredPost._id}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45 }}
                      className="group"
                    >
                      <Card className="overflow-hidden border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]" hover>
                        <div className="grid lg:grid-cols-2">
                          <div className="relative h-64 lg:h-full min-h-[270px] overflow-hidden">
                            <img
                              src={featuredPost.mainImage}
                              alt={featuredPost.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                            <div className="absolute top-3 left-3 right-3">
                              <p className="inline-block max-w-[95%] text-[11px] sm:text-xs font-semibold tracking-[0.08em] uppercase text-white bg-black/55 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 line-clamp-2">
                                {featuredPost.title}
                              </p>
                            </div>
                          </div>
                          <Card.Content className="md:p-8">
                            <Badge variant="outline" className="mb-4">Featured Insight</Badge>
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{featuredPost.title}</h2>
                            {featuredPost.excerpt ? (
                              <p className="text-base text-[#c6d7ff] mb-5 leading-relaxed">{featuredPost.excerpt}</p>
                            ) : null}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#d6e4ff] mb-4">
                              <span className="inline-flex items-center gap-1 rounded-full bg-black/30 border border-white/20 px-2.5 py-1">
                                <FaCalendar className="w-3 h-3" />
                                {new Date(featuredPost.publishedAt).toLocaleDateString('en-ZA', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              {featuredPost.author ? (
                                <span className="rounded-full bg-black/30 border border-white/20 px-2.5 py-1">
                                  {featuredPost.author}
                                </span>
                              ) : null}
                            </div>
                            <Link to={`/web-development-blog/${featuredPost.slug}`}>
                              <Button variant="gradient" size="sm" showArrow>
                                Read Featured Article
                              </Button>
                            </Link>
                          </Card.Content>
                        </div>
                      </Card>
                    </motion.article>
                  ) : null}

                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {remainingPosts.map((post, index) => (
                      <motion.article
                        key={post._id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        className="group"
                      >
                        <Card className="h-full overflow-hidden border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]" hover>
                          <div className="relative h-52 overflow-hidden">
                            <img
                              src={post.mainImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute top-3 left-3 right-3">
                              <p className="inline-block max-w-[95%] text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase text-white bg-black/55 backdrop-blur-md border border-white/20 rounded-xl px-2.5 py-1.5 line-clamp-2">
                                {post.title}
                              </p>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#d6e4ff]">
                              <span className="inline-flex items-center gap-1 rounded-full bg-black/40 border border-white/20 px-2.5 py-1">
                                <FaCalendar className="w-3 h-3" />
                                {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              {post.author ? (
                                <span className="rounded-full bg-black/40 border border-white/20 px-2.5 py-1">
                                  {post.author}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <Card.Content>
                            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">{post.title}</h2>
                            {post.excerpt ? (
                              <p className="text-sm text-[#c6d7ff] mb-4 line-clamp-3">{post.excerpt}</p>
                            ) : null}

                            {post.categories?.length ? (
                              <div className="flex items-start gap-2 mb-4">
                                <FaTags className="w-3.5 h-3.5 text-[#8de4ff] mt-1" />
                                <div className="flex flex-wrap gap-1.5">
                                  {post.categories.slice(0, 3).map((category) => (
                                    <span
                                      key={`${post._id}-${category}`}
                                      className="text-xs px-2 py-1 rounded-full border border-white/15 text-[#d2dfff] bg-white/[0.03]"
                                    >
                                      {category}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            <Link to={`/web-development-blog/${post.slug}`}>
                              <Button variant="outline" size="sm" className="w-full" showArrow>
                                Read Article
                              </Button>
                            </Link>
                          </Card.Content>
                        </Card>
                      </motion.article>
                    ))}
                  </motion.div>
                </div>
              </AnimatePresence>
            )}
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="max-w-4xl mx-auto border border-[#74a7ff]/35 bg-[linear-gradient(130deg,rgba(7,17,35,0.9),rgba(8,16,33,0.55))] text-center">
              <Card.Content>
                <h3 className="virtara-display text-3xl md:text-4xl mb-4">Get Tactical Insights in Your Inbox</h3>
                <p className="text-[#c7d9ff] max-w-2xl mx-auto mb-8 text-base md:text-lg">
                  Monthly practical advice on SEO, web performance and conversion systems for South African businesses.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.04] border border-white/15 text-white text-sm md:text-base focus:border-[#8df6ff] focus:outline-none focus:ring-2 focus:ring-[#8df6ff]/20 transition-all duration-300"
                  />
                  <Button type="submit" disabled={isSubmitting} className="px-7 py-3.5 rounded-full" showArrow>
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
              </Card.Content>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Blog;
