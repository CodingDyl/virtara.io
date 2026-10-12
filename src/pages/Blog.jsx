import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast, Toaster } from 'react-hot-toast';
import { IconArrowUpRight, IconMail } from '@tabler/icons-react';
import { client } from '../lib/sanity';
import { subscribeToNewsletter } from '../config/firebase';
import PageShell from '../components/layout/PageShell';
import PageHero from '../components/layout/PageHero';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';
import { toastOptions } from '../components/ui/toastOptions';

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

const Meta = ({ post }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-caption font-normal text-quiet">
    {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
    {post.author && (
      <>
        <span aria-hidden="true">·</span>
        <span>{post.author}</span>
      </>
    )}
    {post.readTime && (
      <>
        <span aria-hidden="true">·</span>
        <span>{post.readTime} min read</span>
      </>
    )}
  </p>
);

const PostCard = ({ post }) => (
  <article className="group relative flex flex-col overflow-hidden rounded-card border border-edge bg-ink transition-colors duration-base hover:border-edge-strong">
    <div className="relative aspect-[16/9] overflow-hidden border-b border-edge bg-charcoal">
      {post.mainImage && (
        <img
          src={`${post.mainImage}?w=800&auto=format`}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
    <div className="flex flex-1 flex-col p-5">
      {post.categories?.length ? (
        <ul className="mb-3 flex flex-wrap gap-1.5">
          {post.categories.slice(0, 2).map((c) => (
            <li key={c} className="rounded-pill border border-edge px-2 py-0.5 text-[12px] text-mist">{c}</li>
          ))}
        </ul>
      ) : null}
      <h2 className="text-feature text-cloud">
        <Link to={`/web-development-blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h2>
      {post.excerpt && <p className="mt-2 line-clamp-3 text-nav font-normal leading-relaxed text-mist">{post.excerpt}</p>}
      <div className="mt-auto pt-5">
        <Meta post={post} />
      </div>
    </div>
  </article>
);

const SkeletonCard = () => (
  <div className="overflow-hidden rounded-card border border-edge bg-ink" aria-hidden="true">
    <div className="aspect-[16/9] animate-pulse bg-charcoal" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-3/4 animate-pulse rounded bg-steel" />
      <div className="h-3 w-full animate-pulse rounded bg-steel/70" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-steel/70" />
    </div>
  </div>
);

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
    <PageShell>
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

      <Toaster position="top-right" toastOptions={toastOptions} />

      <PageHero
        announcement={{ label: 'Insights feed' }}
        title="Clarity for teams building digital growth."
        lead="Tactical insights on web strategy, SEO systems, conversion architecture and demand generation."
      />

      <section className="pb-20 md:pb-28" aria-label="Articles">
        <div className="shell">
          {/* Category tabs */}
          <div className="-mx-4 mb-8 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const on = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-control px-4 py-2 text-nav capitalize transition-colors duration-fast',
                    on ? 'bg-white/[0.05] text-cloud' : 'text-mist hover:text-frost'
                  )}
                >
                  <span aria-hidden="true" className={cn('h-1.5 w-1.5 rotate-45 rounded-[1px]', on ? 'bg-signal' : 'bg-edge-strong')} />
                  {category}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <span className="sr-only" role="status">Loading articles</span>
              {[0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-card border border-edge bg-ink px-6 py-16 text-center">
              <p className="text-feature text-cloud">No posts in this category yet.</p>
              <p className="mt-2 text-nav font-normal text-mist">Try another category, or subscribe below to hear when one lands.</p>
              <Button variant="secondary" size="sm" className="mt-6" onClick={() => setActiveCategory('all')}>
                Show all posts
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {featuredPost && (
                <article className="group relative grid overflow-hidden rounded-card border border-edge bg-charcoal transition-colors duration-base hover:border-edge-strong lg:grid-cols-2">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-edge lg:aspect-auto lg:min-h-[340px] lg:border-b-0 lg:border-r">
                    {featuredPost.mainImage && (
                      <img
                        src={`${featuredPost.mainImage}?w=1200&auto=format`}
                        alt=""
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.02]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <p className="inline-flex w-fit items-center gap-1.5 rounded-pill border border-edge bg-ink px-2.5 py-0.5 text-caption text-mist">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      Featured
                    </p>
                    <h2 className="mt-4 text-title text-cloud">
                      <Link to={`/web-development-blog/${featuredPost.slug}`} className="after:absolute after:inset-0">
                        {featuredPost.title}
                      </Link>
                    </h2>
                    {featuredPost.excerpt && <p className="mt-3 text-body text-mist">{featuredPost.excerpt}</p>}
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <Meta post={featuredPost} />
                      <span className="inline-flex items-center gap-1 text-nav text-signal-soft group-hover:text-cloud">
                        Read
                        <IconArrowUpRight size={15} stroke={2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              )}
              {remainingPosts.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section pt-0 md:pt-0" aria-labelledby="newsletter-heading">
        <div className="shell">
          <div className="grid items-center gap-8 rounded-card border border-edge bg-ink p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 id="newsletter-heading" className="text-section text-cloud">Get tactical insights in your inbox.</h2>
              <p className="mt-3 text-body text-frost">
                Monthly practical advice on SEO, web performance and conversion systems for South African businesses.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row" noValidate>
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <div className="relative flex-1">
                <IconMail size={16} stroke={1.6} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-quiet" />
                <input
                  id="nl-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-input h-11 py-0 pl-10"
                />
              </div>
              <Button type="submit" size="md" loading={isSubmitting} className="font-semibold">
                {isSubmitting ? 'Subscribing…' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default Blog;
