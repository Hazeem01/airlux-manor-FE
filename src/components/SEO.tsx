import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Airlux Manor | Premium Luxury Real Estate Abuja Nigeria | Trusted Investments",
  description = "Discover premium luxury properties in Abuja, Nigeria with Airlux Manor. Expert real estate services, luxury homes, apartments, and prime land investments. Trusted by discerning clients for excellence, innovation, and timeless value.",
  keywords = "luxury real estate Abuja, premium properties Nigeria, luxury homes Abuja, real estate investment Nigeria, Abuja luxury apartments, high-end properties Nigeria, real estate Abuja, luxury villas Abuja, prime land Abuja, property investment Nigeria, Airlux Manor, luxury real estate agent Abuja",
  canonical,
  ogImage = "https://airluxmanor.com/og-image.png",
  ogType = "website",
  structuredData,
  noIndex = false,
  noFollow = false,
}) => {
  const robotsContent = `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`;
  const fullTitle = title.includes('Airlux Manor') ? title : `${title} | Airlux Manor`;
  const fullCanonical = canonical || `https://airluxmanor.com${window.location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Airlux Manor" />
      <meta property="og:locale" content="en_NG" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:creator" content="@airluxmanor" />
      <meta name="twitter:site" content="@airluxmanor" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
