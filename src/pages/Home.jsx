import { motion }from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { bg_hero,} from '../assets';
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import Footer from '../components/Footer';
import { PinContainer } from "../components/ui/3d-pin";
import { Link } from 'react-router-dom';
import { testimonials, projectImages, items } from '../constants';
import { Helmet } from 'react-helmet-async';
import Silk from '../components/Silk';
import Badge from '../components/ui/Badge';

function Home() {

  return (
    <main className="bg-[#0F0F0F] min-h-screen">
      <Helmet>
        <title>Virtara | Web Design, Development | Digital Agency & Marketing Services</title>
        <meta name="description" content="Transform your digital presence with our innovative web design, development, and digital marketing solutions. Creating digital experiences that matter for modern businesses." />
        <meta name="keywords" content="digital agency, web design, web development, digital marketing, brand strategy, SEO" />
        <link rel="canonical" href="https://virtara.co.za" />
        

        {/* Schema Markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Virtara",
              "description": "We craft innovative digital solutions that help brands stand out and connect with their audience.",
              "image": "${bg_hero}",
              "url": "https://www.virtara.co.za",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "South Africa"
              },

              "priceRange": "R4000 - R500000",

              "serviceType": ["Web Design", "Web Development", "Software Development", "Digital Marketing", "Brand Strategy"]
            }
          `}
        </script>
      </Helmet>

      <Navbar />

      <section className="min-h-screen relative flex items-center justify-center pt-32 md:pt-40">
        <div 
          className="absolute inset-0 z-0 bg-[#0F0F0F]"
        >
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/90 via-[#0F0F0F]/80 to-[#0F0F0F]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center text-center lg:text-left gap-12"
          >
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4"
              >
                <Badge variant="primary" size="lg">
                  Digital Agency
                </Badge>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-8"
              >
                Impactful Websites. Effortless 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                  {" "}Growth.
                </span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 mb-8 flex flex-col gap-2 items-center md:items-start"
              >
                <p className="text-lg text-white/70 leading-relaxed">
                  We craft innovative digital solutions that help your business stand out, attract customers, and drive real growth.
                </p>
                <Link to="/start-your-project">
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-white to-white/90 text-black rounded-full font-medium flex items-center gap-3 hover:shadow-xl transition-all duration-300 group"
                  >
                    <span>Schedule a Free Strategy Session</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>

            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4 flex flex-col items-center lg:items-start my-auto gap-10 lg:gap-20"
            >
              {[
                { number: "01", title: "Web Design & Development", path: "/services#development" },
                { number: "02", title: "Maintenance & Support", path: "/maintenance-support" },
                { number: "03", title: "SEO Optimisation", path: "/services#seo" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Link to={item.path}>
                    <motion.div 
                      className="flex items-center gap-4 group cursor-pointer"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span 
                        className="text-white/40 text-lg font-mono group-hover:text-[#00f2fe] transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        {item.number}
                      </motion.span>
                      <span className="text-white text-xl no-underline hover:underline group-hover:text-[#00f2fe] transition-colors duration-300">
                        {item.title}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="flex justify-center mt-16"
          >
            <motion.div 
              className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                document.querySelector('#services-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <motion.div
                animate={{
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-3 bg-gradient-to-b from-[#00f2fe] to-[#ff00e5] rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services-section" className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8">
              Obtaining Customers Made
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Easy
              </span>
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              We understand that every business is unique, and we tailor our strategies to meet your specific needs. Whether you're looking to increase brand awareness, drive sales, or enhance customer engagement, our team is here to help.
            </p>
          </motion.div>

          <BentoGrid className="max-w-7xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                className={item.className}
                image={item.image}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-[#0F0F0F] to-[#161616]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8">
              Our Featured
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Work
              </span>
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful projects and see how we've helped businesses transform their digital presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
            {projectImages.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PinContainer 
                  title={project.link}
                  href={project.link}
                  containerClassName="h-[30rem] w-full flex items-center justify-center"
                >
                  <div className="flex basis-full flex-col p-4 sm:p-6 tracking-tight text-slate-100/50 w-[85vw] sm:w-[28rem] md:w-[22rem] lg:w-[24rem] h-[24rem] border border-white/10 rounded-lg bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
                      {project.title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500">
                        {project.description || "Innovative digital solutions for modern businesses"}
                      </span>
                    </div>
                    <div 
                      className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden border border-white/10"
                      role="img" 
                      aria-label={project.title}
                    >
                      <img 
                        src={project.image} 
                        alt={`${project.title} - Project showcase`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </PinContainer>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/our-work">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <span>View Full Portfolio</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-[#0F0F0F] to-[#161616]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8">
              What Our Clients
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
                {" "}Say
              </span>
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about their experience working with us.
            </p>
          </motion.div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
