import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const GuideNotFound = () => (
  <>
    <Helmet>
      <title>Guide not found | Virtara</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="bg-[#050910] min-h-screen">
      <Navbar />
      <main className="pt-40 pb-24 container mx-auto px-4 sm:px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-white">That guide is not here</h1>
        <p className="mt-4 text-white/70">
          It may have moved. <Link to="/guides" className="text-[#8df6ff] underline">See every free guide</Link>.
        </p>
      </main>
      <Footer />
    </div>
  </>
);

export default GuideNotFound;
