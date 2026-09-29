import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { allLeadMagnets, coverUrl } from '../../../lib/leadMagnets';

/** Every free guide and checklist on the site. */
const GuidesIndex = () => {
  const magnets = allLeadMagnets();

  return (
    <>
      <Helmet>
        <title>Free Guides and Checklists | Virtara</title>
        <meta name="description" content="Practical, free checklists and guides for getting more enquiries from your website." />
        <link rel="canonical" href="https://virtara.co.za/guides" />
      </Helmet>

      <div className="bg-[#050910] min-h-screen">
        <Navbar />
        <main className="pt-32 md:pt-40 pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Free guides and checklists</h1>
            <p className="mt-4 text-xl text-white/70">Practical things you can do this week to get more from your website.</p>

            {magnets.length === 0 ? (
              <p className="mt-12 text-white/60">
                New guides are on the way. In the meantime, try the{' '}
                <Link to="/resources/health-check" className="text-[#8df6ff] underline">website health check</Link>.
              </p>
            ) : (
              <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                {magnets.map((magnet) => (
                  <li key={magnet.slug}>
                    <Link
                      to={`/guides/${magnet.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-[#8df6ff]/40"
                    >
                      {coverUrl(magnet) ? (
                        <img src={coverUrl(magnet)} alt="" className="mb-5 aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
                      ) : null}
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8df6ff]">{magnet.format}</span>
                      <span className="mt-2 text-xl font-bold text-white">{magnet.title}</span>
                      <span className="mt-2 flex-1 text-white/65">{magnet.promise}</span>
                      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#8df6ff]">
                        {magnet.landing.cta} <FaArrowRight aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GuidesIndex;
