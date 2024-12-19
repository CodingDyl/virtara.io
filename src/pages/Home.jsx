import { motion }from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { virtec, vaja, mpower, bg_hero, web_design_bento, brand_strat, seo_op, digi_marketing } from '../assets';
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { IconBrandFigma, IconBrandGithub, IconBrandGoogle, IconBrandTwitter } from "@tabler/icons-react";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import Footer from '../components/Footer';
import Chatbot from '../chatbot/Chatbot';
import { PinContainer } from "../components/ui/3d-pin";

function Home() {
  const projectImages = [
    { 
      image: virtec, 
      link: "https://virtecmarketing.com",
      title: "Virtec Marketing",
      description: "Strategic digital marketing solutions for modern businesses"
    },
    { 
      image: vaja, 
      link: "https://vaja.co.za",
      title: "Vaja",
      description: "Premium Sauna's & steam rooms with innovative design"
    },
    { 
      image: mpower, 
      link: "https://mpowerratings.co.za",
      title: "MPower Ratings",
      description: "BEE Rating & Verification"
    },
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
      <Chatbot />
      <Navbar />

      <section className="min-h-screen relative flex items-center justify-center pt-20 md:pt-40">
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

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center text-center lg:text-left gap-12"
          >
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
                Creating digital experiences that 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
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

            <div className="space-y-4 flex flex-col items-center lg:items-start my-auto gap-10 lg:gap-20">
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

      <section className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8">
            Obtaining Customers Made
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
              {" "}Easy
            </span>
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

      <section className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-[#0F0F0F] to-[#161616]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8">
            Our Featured
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
              {" "}Work
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-12">
            Explore our portfolio of successful projects and see how we've helped businesses transform their digital presence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
            {projectImages.map((project, index) => (
              <PinContainer 
                key={index}
                title={project.link}
                href={project.link}
                containerClassName="h-[30rem] w-full flex items-center justify-center"
              >
                <div className="flex basis-full flex-col p-4 sm:p-6 tracking-tight text-slate-100/50 w-[85vw] sm:w-[28rem] md:w-[22rem] lg:w-[24rem] h-[24rem] border border-white/10 rounded-lg bg-gradient-to-b from-white/5 to-transparent">
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
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </PinContainer>
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

      <section className="py-12 md:py-20 bg-gradient-to-b from-[#0F0F0F] to-[#161616]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8">
            What Our Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#ff00e5]">
              {" "}Say
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-12">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
