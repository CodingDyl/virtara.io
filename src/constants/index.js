import {virtec, vaja, mpower} from "../assets/index.js";
import web_design_bento from "../assets/web_design_bento.png";
import digi_marketing from "../assets/digi_marketing.png";
import brand_strat from "../assets/brand_strat.png";
import seo_op from "../assets/seo_op.png";

  const process = [
    {
      step: "01",
      title: "Discover",
      description: "Understanding your goals and requirements"
    },
    {
      step: "02",
      title: "Design",
      description: "Creating the perfect look and feel"
    },
    {
      step: "03",
      title: "Develop",
      description: "Building with cutting-edge technology"
    },
    {
      step: "04",
      title: "Deliver",
      description: "Launch and ongoing support"
    }
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "e-commerce",
      image: "https://via.placeholder.com/600x400",
      description: "Modern online store with AI-powered recommendations"
    },
    {
      title: "Corporate Website",
      category: "corporate",
      image: "https://via.placeholder.com/600x400",
      description: "Professional web presence for enterprise client"
    },
    // Add more projects as needed
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "R10,000 - R20,000",
      features: [
        "Custom Design",
        "Mobile Responsive",
        "3 Pages",
        "Contact Form",
        "Basic SEO"
      ]
    },
    {
      name: "Professional",
      price: "R30,000 – R50,000",
      features: [
        "Everything in Starter",
        "E-Commerce Integration",
        "10 Pages",
        "CMS Integration",
        "Advanced SEO",
        "Social Media Integration"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Professional",
        "Custom Functionality",
        "Unlimited Pages",
        "AI Integration",
        "Priority Support",
        "Analytics Dashboard"
      ]
    }
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

const items = [
  {
    title: "Web Design & Development",
    description: "Create stunning, responsive websites that deliver exceptional user experiences and drive results.",
    className: "md:col-span-2",
    image: web_design_bento,
  },
  {
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to boost your online presence and reach your target audience.",
    className: "md:col-span-1",
    image: digi_marketing,
  },
  {
    title: "Brand Strategy",
    description: "Develop compelling brand identities that resonate with your audience and set you apart.",
    className: "md:col-span-1",
    image: brand_strat,
  },
  {
    title: "SEO Optimization",
    description: "Improve your search engine rankings and drive organic traffic to your website.",
    className: "md:col-span-2",
    image: seo_op,
  },
];

  export {process, projects, pricingTiers, testimonials, projectImages, items};