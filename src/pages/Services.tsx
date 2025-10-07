import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, Key, TrendingUp, Settings } from "lucide-react";
import { seoData } from "@/lib/seoData";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description:
        "Discover premium residential and commercial properties tailored to your lifestyle and investment goals. From luxury villas to modern apartments, we offer exclusive listings in prime locations across Abuja.",
      features: ["Luxury Villas", "High-Rise Apartments", "Commercial Spaces", "Prime Land"],
    },
    {
      icon: Key,
      title: "Property Leasing",
      description:
        "Find the perfect property to lease with flexible terms and transparent processes. Whether you need a temporary residence or a long-term rental, we provide premium options that suit your needs.",
      features: ["Residential Leasing", "Corporate Rentals", "Short & Long Term", "Flexible Terms"],
    },
    {
      icon: TrendingUp,
      title: "Real Estate Advisory",
      description:
        "Navigate the Nigerian real estate market with confidence. Our expert advisors provide strategic guidance on property investments, market trends, and portfolio management to maximize your returns.",
      features: ["Market Analysis", "Investment Strategy", "Portfolio Management", "Due Diligence"],
    },
    {
      icon: Settings,
      title: "Property Management",
      description:
        "Comprehensive property management services to protect and enhance your real estate investments. From maintenance to tenant relations, we handle everything so you can enjoy peace of mind.",
      features: ["Maintenance Services", "Tenant Management", "Rent Collection", "Property Security"],
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={seoData.services.title}
        description={seoData.services.description}
        keywords={seoData.services.keywords}
        structuredData={seoData.services.structuredData}
      />
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-luxury-gold">Services</span>
            </h1>
            <p className="font-inter text-xl text-gray-300 leading-relaxed">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                {service.comingSoon && (
                  <div className="absolute top-4 right-4 bg-luxury-gold text-luxury-dark text-xs font-bold px-3 py-1 rounded-full">
                    COMING SOON
                  </div>
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                  <service.icon className="text-luxury-gold" size={32} />
                </div>
                <h3 className="font-playfair text-3xl font-bold text-luxury-dark mb-4">{service.title}</h3>
                <p className="font-inter text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center font-inter text-sm text-gray-700">
                      <span className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {!service.comingSoon && (
                  <Button variant="luxury-outline" className="w-full">
                    Learn More
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-luxury-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="font-inter text-lg text-gray-300 leading-relaxed mb-8">
              Contact us today to discuss your real estate needs and discover how Airlux Manor can help you achieve your property goals.
            </p>
            <Button variant="luxury" size="lg">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
