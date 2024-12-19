
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
      price: "R10,000",
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
      price: "R25,000",
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

  export {process, projects, pricingTiers};