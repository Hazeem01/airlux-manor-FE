// SEO utility functions for Airlux Manor

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generate organization structured data
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Airlux Manor",
    "url": "https://airluxmanor.com",
    "logo": "https://airluxmanor.com/logo-light.png",
    "description": "Premium luxury real estate services in Abuja, Nigeria",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 2, Leisure Court Estate, Aco, Lugbe",
      "addressLocality": "Abuja",
      "addressRegion": "FCT",
      "addressCountry": "Nigeria"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-708-683-1671",
      "contactType": "customer service",
      "email": "info@airluxmanor.com",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/airluxmanor",
      "https://www.instagram.com/airluxmanor",
      "https://www.linkedin.com/company/airlux-manor/",
      "https://twitter.com/airluxmanor"
    ]
  };
};

// Generate local business structured data
export const generateLocalBusinessStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Airlux Manor",
    "image": "https://airluxmanor.com/og-image.png",
    "telephone": "+234-708-683-1671",
    "email": "info@airluxmanor.com",
    "url": "https://airluxmanor.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 2, Leisure Court Estate, Aco, Lugbe",
      "addressLocality": "Abuja",
      "addressRegion": "FCT",
      "addressCountry": "Nigeria"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "9.0765",
      "longitude": "7.3986"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$$",
    "currenciesAccepted": "NGN",
    "paymentAccepted": "Cash, Bank Transfer, Check"
  };
};

// Generate website structured data
export const generateWebsiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Airlux Manor",
    "url": "https://airluxmanor.com",
    "description": "Premium luxury real estate services in Abuja, Nigeria",
    "publisher": {
      "@type": "Organization",
      "name": "Airlux Manor"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://airluxmanor.com/properties?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

// Generate review structured data
export const generateReviewStructuredData = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Airlux Manor",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };
};

// SEO-friendly URL generation
export const generateSEOFriendlyURL = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Generate meta description from content
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  return cleanContent.substring(0, maxLength - 3) + '...';
};

// Generate keywords from content
export const generateKeywords = (content: string, additionalKeywords: string[] = []): string => {
  const baseKeywords = [
    'luxury real estate Abuja',
    'premium properties Nigeria',
    'luxury homes Abuja',
    'real estate investment Nigeria',
    'Abuja luxury apartments',
    'high-end properties Nigeria',
    'real estate Abuja',
    'luxury villas Abuja',
    'prime land Abuja',
    'property investment Nigeria',
    'Airlux Manor'
  ];
  
  const contentKeywords = content
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'oil', 'sit', 'try', 'use', 'she', 'put', 'end', 'why', 'let', 'ask', 'run', 'own', 'say', 'too', 'any', 'may', 'set', 'try', 'use', 'she', 'put', 'end', 'why', 'let', 'ask', 'run', 'own', 'say', 'too', 'any'].includes(word))
    .slice(0, 10);
  
  return [...baseKeywords, ...additionalKeywords, ...contentKeywords]
    .filter((keyword, index, array) => array.indexOf(keyword) === index)
    .join(', ');
};

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Lazy load images
export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
};
