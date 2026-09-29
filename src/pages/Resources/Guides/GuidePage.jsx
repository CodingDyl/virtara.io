import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LeadHoneypot from '../../../components/ui/LeadHoneypot';
import submitLead from '../../../server/submitLead';
import { coverUrl, findLeadMagnet, unlockLeadMagnet } from '../../../lib/leadMagnets';
import GuideNotFound from './GuideNotFound';

const inputClass =
  'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8df6ff]';

/** A lead magnet's landing page: what it is, who it is for, and the form. */
const GuidePage = () => {
  const { slug } = useParams();
  const magnet = findLeadMagnet(slug);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', company: '', updates: false });
  const [status, setStatus] = useState({ sending: false, error: '' });

  if (!magnet) return <GuideNotFound />;

  const cover = coverUrl(magnet);
  const canonical = `https://virtara.co.za/guides/${magnet.slug}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ sending: true, error: '' });
    try {
      await submitLead(
        `magnet-${magnet.slug}`,
        { name: form.name, email: form.email, company: form.company, hp: event.target.elements?.hp?.value },
        { guide: magnet.title },
        { consent: form.updates },
      );
      unlockLeadMagnet(magnet.slug);
      navigate(`/guides/${magnet.slug}/read`);
    } catch (error) {
      setStatus({ sending: false, error: error.message });
    }
  };

  return (
    <>
      <Helmet>
        <title>{magnet.seo.title}</title>
        <meta name="description" content={magnet.seo.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={magnet.seo.title} />
        <meta property="og:description" content={magnet.seo.description} />
        <meta property="og:url" content={canonical} />
        {cover ? <meta property="og:image" content={`https://virtara.co.za${cover}`} /> : null}
      </Helmet>

      <div className="bg-[#050910] min-h-screen">
        <Navbar />

        <main className="pt-32 md:pt-40 pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <section aria-labelledby="guide-headline">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8df6ff]">Free {magnet.format}</p>
                <h1 id="guide-headline" className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                  {magnet.landing.headline}
                </h1>
                {magnet.landing.subhead ? <p className="mt-5 text-xl text-white/70">{magnet.landing.subhead}</p> : null}
                {magnet.audience ? <p className="mt-4 text-white/50">Who it is for: {magnet.audience}</p> : null}

                <h2 className="mt-10 text-lg font-semibold text-white">What is inside</h2>
                <ul className="mt-4 space-y-3">
                  {magnet.landing.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-white/75">
                      <FaCheck className="mt-1.5 shrink-0 text-[#8df6ff]" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {cover ? (
                  <img
                    src={cover}
                    alt={`Cover of ${magnet.title}`}
                    className="mt-10 w-full max-w-md rounded-2xl border border-white/10"
                    loading="lazy"
                  />
                ) : null}
              </section>

              <section aria-label={`Get ${magnet.title}`} className="bg-white/5 p-8 rounded-2xl border border-white/10 md:sticky md:top-32">
                <h2 className="text-2xl font-bold text-white">{magnet.title}</h2>
                <p className="mt-2 text-white/60">{magnet.promise}</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <LeadHoneypot />
                  <div>
                    <label htmlFor="guide-name" className="block text-white mb-2">Name</label>
                    <input id="guide-name" required autoComplete="name" maxLength={120} className={inputClass} value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="guide-email" className="block text-white mb-2">Email</label>
                    <input id="guide-email" type="email" required autoComplete="email" maxLength={254} className={inputClass} value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="guide-company" className="block text-white mb-2">Business <span className="text-white/40">(optional)</span></label>
                    <input id="guide-company" autoComplete="organization" maxLength={160} className={inputClass} value={form.company}
                      onChange={(event) => setForm({ ...form, company: event.target.value })} />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-white/60">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-[#8df6ff]" checked={form.updates}
                      onChange={(event) => setForm({ ...form, updates: event.target.checked })} />
                    Also send me the occasional practical idea for my website. Unsubscribe any time.
                  </label>
                  <button
                    type="submit"
                    disabled={status.sending}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-[#050910] rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {status.sending ? 'Sending...' : magnet.landing.cta}
                    {!status.sending ? <FaArrowRight aria-hidden="true" /> : null}
                  </button>
                  {status.error ? <p role="alert" className="text-sm text-red-300">{status.error}</p> : null}
                  <p className="text-xs text-white/40">
                    We use your details to send this and to follow up once. See our{' '}
                    <Link to="/legal/privacy-policy" className="underline hover:text-white/70">privacy policy</Link>.
                  </p>
                </form>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GuidePage;
