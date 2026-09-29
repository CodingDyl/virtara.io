import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowRight, FaPrint } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LeadMagnetBody from '../../../components/LeadMagnetBody';
import { findLeadMagnet, isLeadMagnetUnlocked } from '../../../lib/leadMagnets';
import GuideNotFound from './GuideNotFound';

/** The resource itself, for someone who signed up. Printable, and kept out of search. */
const GuideRead = () => {
  const { slug } = useParams();
  const magnet = findLeadMagnet(slug);

  if (!magnet) return <GuideNotFound />;
  if (!isLeadMagnetUnlocked(magnet.slug)) return <Navigate to={`/guides/${magnet.slug}`} replace />;

  return (
    <>
      <Helmet>
        <title>{magnet.title} | Virtara</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="bg-[#050910] min-h-screen">
        <div className="print:hidden">
          <Navbar />
        </div>

        <main className="pt-32 md:pt-40 pb-16 print:pt-0">
          <article className="guide-print container mx-auto px-4 sm:px-6 max-w-3xl">
            <header className="border-b border-white/10 pb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8df6ff]">Virtara {magnet.format}</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">{magnet.title}</h1>
              <p className="mt-4 text-xl text-white/70">{magnet.promise}</p>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-white/80 hover:bg-white/10 print:hidden"
              >
                <FaPrint aria-hidden="true" /> Print or save as PDF
              </button>
            </header>

            {magnet.sections.map((section) => (
              <section key={section.heading} className="mt-12 break-inside-avoid">
                <h2 className="mb-5 text-2xl font-bold text-white">{section.heading}</h2>
                <LeadMagnetBody body={section.body} />
              </section>
            ))}

            {magnet.nextStep ? (
              <aside className="mt-16 rounded-2xl border border-[#8df6ff]/30 bg-[#8df6ff]/5 p-8">
                <h2 className="text-2xl font-bold text-white">Next step</h2>
                <p className="mt-3 text-lg text-white/75">{magnet.nextStep}</p>
                <Link
                  to="/start-your-project"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] px-6 py-3 font-semibold text-[#050910] hover:opacity-90 print:hidden"
                >
                  Talk to Virtara <FaArrowRight aria-hidden="true" />
                </Link>
              </aside>
            ) : null}
          </article>
        </main>

        <div className="print:hidden">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GuideRead;
