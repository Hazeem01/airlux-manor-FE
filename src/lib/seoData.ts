// SEO data and structured data for different pages

export const seoData = {
  home: {
    title: "Airlux Manor | Premium Luxury Real Estate Abuja Nigeria | Trusted Investments",
    description: "Discover premium luxury properties in Abuja, Nigeria with Airlux Manor. Expert real estate services, luxury homes, apartments, and prime land investments. Trusted by discerning clients for excellence, innovation, and timeless value.",
    keywords: "luxury real estate Abuja, premium properties Nigeria, luxury homes Abuja, real estate investment Nigeria, Abuja luxury apartments, high-end properties Nigeria, real estate Abuja, luxury villas Abuja, prime land Abuja, property investment Nigeria, Airlux Manor, luxury real estate agent Abuja",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Airlux Manor",
      "description": "Premium luxury real estate services in Abuja, Nigeria. Specializing in luxury homes, apartments, villas, and prime land investments.",
      "url": "https://airluxmanor.com",
      "logo": "https://airluxmanor.com/logo-light.png",
      "image": "https://airluxmanor.com/og-image.png",
      "telephone": "+234-XXX-XXXX",
      "email": "info@airluxmanor.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Abuja",
        "addressLocality": "Abuja",
        "addressRegion": "FCT",
        "addressCountry": "Nigeria"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "9.0765",
        "longitude": "7.3986"
      },
      "areaServed": {
        "@type": "City",
        "name": "Abuja",
        "containedInPlace": {
          "@type": "Country",
          "name": "Nigeria"
        }
      },
      "serviceType": [
        "Luxury Real Estate Sales",
        "Property Investment Consulting",
        "Luxury Home Rentals",
        "Prime Land Development",
        "Real Estate Advisory"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Luxury Real Estate Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Luxury Property Sales",
              "description": "Premium luxury homes, apartments, and villas in Abuja"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Real Estate Investment Consulting",
              "description": "Expert guidance for property investment opportunities"
            }
          }
        ]
      },
      "sameAs": [
        "https://www.facebook.com/airluxmanor",
        "https://www.instagram.com/airluxmanor",
        "https://www.linkedin.com/company/airlux-manor/",
        "https://twitter.com/airluxmanor"
      ],
      "foundingDate": "2024",
      "slogan": "Luxury Real Estate. Trusted Investments. Timeless Value."
    }
  },
  
  about: {
    title: "About Us | Expert Luxury Real Estate Team Abuja Nigeria",
    description: "Meet the expert team at Airlux Manor, Abuja's premier luxury real estate agency. Learn about our commitment to excellence, innovation, and delivering timeless value to discerning clients.",
    keywords: "about Airlux Manor, luxury real estate team Abuja, real estate experts Nigeria, property consultants Abuja, real estate agency Abuja, luxury property specialists",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Airlux Manor",
      "description": "Learn about Airlux Manor's expert luxury real estate team and our commitment to excellence in Abuja, Nigeria.",
      "url": "https://airluxmanor.com/about",
      "mainEntity": {
        "@type": "RealEstateAgent",
        "name": "Airlux Manor",
        "description": "Premium luxury real estate services in Abuja, Nigeria"
      }
    }
  },
  
  properties: {
    title: "Luxury Properties for Sale Abuja Nigeria | Premium Real Estate Listings",
    description: "Explore our exclusive collection of luxury properties in Abuja, Nigeria. Premium homes, apartments, villas, and prime land investments. Find your dream property with Airlux Manor.",
    keywords: "luxury properties Abuja, homes for sale Abuja, luxury apartments Abuja, villas Abuja, prime land Abuja, property listings Nigeria, luxury real estate Abuja, high-end properties Nigeria",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Luxury Properties in Abuja",
      "description": "Exclusive collection of luxury properties in Abuja, Nigeria",
      "url": "https://airluxmanor.com/properties",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Luxury Properties",
        "description": "Premium luxury properties in Abuja, Nigeria",
        "numberOfItems": "Multiple"
      }
    }
  },
  
  services: {
    title: "Luxury Real Estate Services Abuja Nigeria | Property Investment Consulting",
    description: "Comprehensive luxury real estate services in Abuja, Nigeria. Property sales, investment consulting, luxury rentals, and prime land development. Expert guidance for discerning clients.",
    keywords: "real estate services Abuja, property investment consulting Nigeria, luxury property sales Abuja, real estate advisory Nigeria, property management Abuja, land development Nigeria",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Luxury Real Estate Services",
      "description": "Comprehensive luxury real estate services in Abuja, Nigeria",
      "url": "https://airluxmanor.com/services",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "Airlux Manor"
      },
      "serviceType": [
        "Luxury Property Sales",
        "Property Investment Consulting",
        "Luxury Home Rentals",
        "Prime Land Development",
        "Real Estate Advisory"
      ],
      "areaServed": {
        "@type": "City",
        "name": "Abuja",
        "containedInPlace": {
          "@type": "Country",
          "name": "Nigeria"
        }
      }
    }
  },
  
  contact: {
    title: "Contact Us | Luxury Real Estate Experts Abuja Nigeria",
    description: "Get in touch with Airlux Manor's luxury real estate experts in Abuja, Nigeria. Professional consultation for property investment, sales, and premium real estate services.",
    keywords: "contact Airlux Manor, real estate consultation Abuja, property experts Nigeria, luxury real estate contact, Abuja property advisors, real estate inquiry Nigeria",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Airlux Manor",
      "description": "Contact our luxury real estate experts in Abuja, Nigeria",
      "url": "https://airluxmanor.com/contact",
      "mainEntity": {
        "@type": "RealEstateAgent",
        "name": "Airlux Manor",
        "telephone": "+234-XXX-XXXX",
        "email": "info@airluxmanor.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Abuja",
          "addressLocality": "Abuja",
          "addressRegion": "FCT",
          "addressCountry": "Nigeria"
        }
      }
    }
  },
  
  blog: {
    title: "Luxury Real Estate Blog Abuja Nigeria | Property Market Insights",
    description: "Stay updated with the latest luxury real estate trends, market insights, and property investment tips in Abuja, Nigeria. Expert analysis from Airlux Manor's real estate professionals.",
    keywords: "real estate blog Abuja, property market insights Nigeria, luxury real estate news, property investment tips Abuja, real estate trends Nigeria, Abuja property market",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Airlux Manor Real Estate Blog",
      "description": "Luxury real estate insights and market analysis for Abuja, Nigeria",
      "url": "https://airluxmanor.com/blog",
      "publisher": {
        "@type": "RealEstateAgent",
        "name": "Airlux Manor"
      }
    }
  }
};

// Property-specific structured data generator
export const generatePropertyStructuredData = (property: {
  name: string;
  description: string;
  price?: string;
  address: string;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  type: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.name,
    "description": property.description,
    "url": `https://airluxmanor.com/properties/${property.name.toLowerCase().replace(/\s+/g, '-')}`,
    "image": property.images,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "NGN",
      "availability": "https://schema.org/InStock"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": "Abuja",
      "addressRegion": "FCT",
      "addressCountry": "Nigeria"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "9.0765",
      "longitude": "7.3986"
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitCode": "MTK"
    },
    "additionalProperty": {
      "@type": "Property",
      "name": property.type
    }
  };
};

// FAQ structured data generator
export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
