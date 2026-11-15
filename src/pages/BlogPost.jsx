import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { IconArrowLeft, IconShare, IconCheck } from '@tabler/icons-react';
import { client, POST_QUERY } from '../lib/sanity';
import { usePrerenderData } from '../lib/prerenderData';
import PageShell from '../components/layout/PageShell';
import ClosingBand from '../components/layout/ClosingBand';
import Button from '../components/ui/Button';

const ShareButton = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* the visitor dismissed the share sheet */
    }
  };
  return (
    <Button variant="secondary" size="sm" onClick={share} icon={copied ? <IconCheck stroke={2} /> : <IconShare stroke={1.8} />}>
      {copied ? 'Link copied' : 'Share'}
    </Button>
  );
};

const BackLink = () => (
  <Link
    to="/web-development-blog"
    className="group inline-flex items-center gap-1.5 text-nav text-mist transition-colors duration-fast hover:text-cloud"
  >
    <IconArrowLeft size={15} stroke={1.8} aria-hidden="true" className="transition-transform duration-base group-hover:-translate-x-0.5" />
    All articles
  </Link>
);

const SITE = 'https://virtara.co.za';

// Fixed zone so the build server and the visitor's browser print the same date.
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Africa/Johannesburg' });

const bodyText = (body) =>
  (body || [])
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text).join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

const BlogPost = () => {
  const { slug } = useParams();
  // A post embedded at build time renders straight away; the fetch below refreshes it.
  const prerendered = usePrerenderData()?.post;
  const initial = prerendered?.slug === slug ? prerendered : null;
  const [post, setPost] = useState(initial);
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await client.fetch(POST_QUERY, { slug });
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
      <PageShell>
        <div className="shell max-w-3xl pt-32" role="status" aria-label="Loading article">
          <div className="h-4 w-24 animate-pulse rounded bg-steel" />
          <div className="mt-8 h-10 w-full animate-pulse rounded bg-steel" />
          <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-steel" />
          <div className="mt-10 aspect-[16/9] w-full animate-pulse rounded-media bg-charcoal" />
        </div>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <div className="shell pt-40 pb-32 text-center">
          <h1 className="text-section text-cloud">Post not found</h1>
          <p className="mt-3 text-body text-mist">The article you're looking for doesn't exist or has moved.</p>
          <Button to="/web-development-blog" className="mt-8">Back to the blog</Button>
        </div>
      </PageShell>
    );
  }

  const date = post.publishedAt ? formatDate(post.publishedAt) : null;
  // Only shown when the post was edited on a later day than it was published.
  const updated =
    post._updatedAt && formatDate(post._updatedAt) !== date ? formatDate(post._updatedAt) : null;
  const url = `${SITE}/web-development-blog/${slug}`;
  const description = post.excerpt || bodyText(post.body).slice(0, 155);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    ...(post.mainImage && { image: post.mainImage }),
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: { '@id': `${SITE}/#organization` },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <PageShell>
      <Helmet>
        <title>{`${post.title} | Virtara Blog`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <article className="relative pt-28 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-glow" />
        <header className="shell relative max-w-3xl">
          <BackLink />
          {post.categories?.length ? (
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {post.categories.map((c) => (
                <li key={c} className="rounded-pill border border-edge bg-ink px-2.5 py-0.5 text-caption text-mist">{c}</li>
              ))}
            </ul>
          ) : null}
          <h1 className="mt-4 text-display text-cloud">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-edge pb-6">
            <p className="flex flex-wrap items-center gap-x-2 text-nav font-normal text-mist">
              {post.author && <span className="text-frost">{post.author}</span>}
              {post.author && date && <span aria-hidden="true" className="text-quiet">·</span>}
              {date && <time dateTime={post.publishedAt}>{date}</time>}
              {updated && (
                <>
                  <span aria-hidden="true" className="text-quiet">·</span>
                  <span>Updated <time dateTime={post._updatedAt}>{updated}</time></span>
                </>
              )}
              {post.readTime && (
                <>
                  <span aria-hidden="true" className="text-quiet">·</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </p>
            <ShareButton title={post.title} />
          </div>
        </header>

        {post.mainImage && (
          <div className="shell mt-10 max-w-5xl">
            <img
              src={`${post.mainImage}?w=1600&auto=format`}
              alt=""
              decoding="async"
              className="aspect-[16/9] w-full rounded-media border border-edge object-cover"
            />
          </div>
        )}

        <div className="shell mt-12 max-w-3xl pb-16">
          <div className="prose prose-virtara prose-lg max-w-prose prose-headings:scroll-mt-24 prose-img:rounded-card prose-img:border prose-img:border-edge">
            <PortableText value={post.body} />
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-6">
            <BackLink />
            <ShareButton title={post.title} />
          </div>
        </div>
      </article>

      <ClosingBand
        title="Want this applied to your site?"
        lead="Book a strategy audit and we'll show you where your site is leaving revenue on the table."
        actions={<Button to="/resources/audit" size="lg" className="font-semibold">Book an audit</Button>}
      />
    </PageShell>
  );
};

export default BlogPost;
