import { motion }from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { virtec, vaja, mpower, bg_hero, web_design_bento, brand_strat, seo_op, digi_marketing } from '../assets';
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { IconBrandFigma, IconBrandGithub, IconBrandGoogle, IconBrandTwitter } from "@tabler/icons-react";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import Footer from '../components/Footer';

function Home() {
  const projectImages = [
    { image: virtec, link: "https://virtecmarketing.com" },
    { image: vaja, link: "https://vaja.com" },
    { image: mpower, link: "https://mpowerratings.com" },
  ];

  const testimonials = [
    { 
        quote: "Virtec transformed our outdated website into a modern masterpiece. We've seen a 40% increase in engagement since the redesign.", 
        name: "Alice Green", 
        designation: "Marketing Director", 
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        quote: "The team at Virtec understood our vision perfectly and delivered a site that exceeded our expectations. Amazing work!", 
        name: "David Patel", 
        designation: "Founder", 
        src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        quote: "Working with Virtec was a seamless experience. They’re creative, professional, and truly care about delivering quality.", 
        name: "Sophia Taylor", 
        designation: "Operations Manager", 
        src: "https://images.unsplash.com/photo-1525186402429-b4ff38bedec6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        quote: "Virtec’s unique designs set our business apart. Their team is always responsive and ready to help. Highly recommend!", 
        name: "Michael Brown", 
        designation: "CEO", 
        src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        quote: "I couldn’t be happier with the results from Virtec. Their attention to detail and dedication is unmatched.", 
        name: "Emily Clark", 
        designation: "Product Manager", 
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    }
];


  const items = [
    {
      title: "Web Design & Development",
      description: "Create stunning, responsive websites that deliver exceptional user experiences and drive results.",
      header: <IconBrandFigma className="h-8 w-8 text-neutral-500 z-10" />,
      className: "md:col-span-2",
      image: web_design_bento,
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions to boost your online presence and reach your target audience.",
      header: <IconBrandGoogle className="h-8 w-8 text-neutral-500" />,
      className: "md:col-span-1",
      image: digi_marketing,
    },
    {
      title: "Brand Strategy",
      description: "Develop compelling brand identities that resonate with your audience and set you apart.",
      header: <IconBrandTwitter className="h-8 w-8 text-neutral-500" />,
      className: "md:col-span-1",
      image: brand_strat,
    },
    {
      title: "SEO Optimization",
      description: "Improve your search engine rankings and drive organic traffic to your website.",
      header: <IconBrandGithub className="h-8 w-8 text-neutral-500" />,
      className: "md:col-span-2",
      image: seo_op,
    },
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />

      <section className="min-h-screen relative flex items-center justify-center pt-40">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bg_hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/90 via-[#0F0F0F]/80 to-[#0F0F0F]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex items-start justify-center text-left"
          >
            <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Creating digital experiences that 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">
                {" "}matter
              </span>
            </h1>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg text-white/70">
                We craft innovative digital solutions that help brands stand out and connect with their audience.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black rounded-full font-medium flex items-center gap-2 hover:bg-white/90 transition-colors"
              >
                Start a project
                <FaArrowRight />
              </motion.button>
            </div>
            </div>

            <div className="space-y-4 flex flex-col items-center my-auto gap-20">
              <div className="flex items-center gap-4">
                <span className="text-white/40">01</span>
                <span className="text-white text-xl">Web Design & Development</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/40">02</span>
                <span className="text-white text-xl">Digital Marketing</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/40">03</span>
                <span className="text-white text-xl">Brand Strategy</span>
              </div>
            </div>
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
              ease: "easeInOut"
            }}
            className="flex justify-center mt-12"
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
              />
            </div>
          </motion.div>
          </div>
         </section>

         <section className="min-h-screen py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
              Obtaining Customers Made Easy
            </h2>
            <p className="text-lg text-white/70 mb-12">
              We understand that every business is unique, and we tailor our strategies to meet your specific needs. Whether you're looking to increase brand awareness, drive sales, or enhance customer engagement, our team is here to help.
            </p>

            <BentoGrid className="max-w-7xl mx-auto">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={item.className}
                  image={item.image}
                />
              ))}
            </BentoGrid>
          </div>
         </section>

         {/* portfolio showcase */}
         <section className="min-h-screen py-20 bg-gradient-to-b from-[#0F0F0F] to-[#161616]">
           <div className="container mx-auto px-6">
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
               Our Featured Work
             </h2>
             <p className="text-lg text-white/70 mb-12">
               Explore our portfolio of successful projects and see how we've helped businesses transform their digital presence.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {projectImages.map((project, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: index * 0.2 }}
                   className="relative group overflow-hidden rounded-2xl"
                 >
                   <img 
                     src={project.image} 
                     alt={`Project ${index + 1}`} 
                     className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors" onClick={() => window.open(project.link, '_blank')}>
                       View Project
                     </button>
                   </div>
                 </motion.div>
               ))}
             </div>

             <div className="flex justify-center">
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
               >
                 View Full Portfolio
                 <FaArrowRight />
               </motion.button>
             </div>
           </div>
         </section>

         {/* testimonials */}
         <section className=" py-20 bg-gradient-to-b from-[#0F0F0F] to-[#161616]">
           <div className="container mx-auto px-6">
             <AnimatedTestimonials testimonials={testimonials} />
           </div>
         </section>

         <Footer />
       </div>
  )
}

export default Home
