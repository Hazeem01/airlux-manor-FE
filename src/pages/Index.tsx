import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/property-1.png";
import property2 from "@/assets/property-2.png";
import property3 from "@/assets/property-3.png";
import { seoData } from "@/lib/seoData";

const Index = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Highest standards in service and results",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Honesty and reliability in every transaction",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Modern strategies and creative solutions",
    },
    {
      icon: Star,
      title: "Client-Centered",
      description: "Services tailored to your unique needs",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title={seoData.home.title}
        description={seoData.home.description}
        keywords={seoData.home.keywords}
        structuredData={seoData.home.structuredData}
      />
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-darker/95 via-luxury-dark/85 to-luxury-dark/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
            Luxury Real Estate.
            <br />
            <span className="text-luxury-gold">Trusted Investments.</span>
            <br />
            Timeless Value.
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Discover premium properties in Abuja that reflect your aspirations and elevate modern living
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button variant="luxury" size="lg" className="text-base px-8">
                Explore Properties <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="luxury-outline" size="lg" className="text-base px-8 bg-transparent text-white border-white hover:bg-white hover:text-luxury-dark">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-8">
              Welcome to <span className="text-luxury-gold">Airlux Manor</span>
            </h2>
            <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
              At Airlux, we believe a home is more than a transaction — it is a lifestyle, a sense of security, and a legacy. Founded with a vision to redefine luxury living in Nigeria, we combine exclusivity, transparency, and modern design to deliver timeless value.
            </p>
            <p className="font-inter text-lg text-gray-700 leading-relaxed">
              From high-rise apartments to serene villas and prime land investments, we connect discerning clients with properties that reflect their aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">
              Our Core Values
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Airlux Manor
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                  <value.icon className="text-luxury-gold" size={32} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-3">{value.title}</h3>
                <p className="font-inter text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">
              Featured <span className="text-luxury-gold">Properties</span>
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              A glimpse of the luxury lifestyle awaiting you
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {[heroImage, property2, property3].map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={img}
                  alt={`Luxury Property ${index + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 via-luxury-dark/30 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-playfair text-2xl font-bold mb-2">Premium Property</p>
                    <p className="font-inter text-sm text-gray-300">Coming Soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/properties">
              <Button variant="luxury" size="lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-luxury-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your <span className="text-luxury-gold">Dream Property</span>?
            </h2>
            <p className="font-inter text-xl text-gray-300 leading-relaxed mb-8">
              Let us help you discover the perfect luxury property that matches your lifestyle and investment goals. Our expert team is ready to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="luxury" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="luxury-outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-luxury-dark">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-dark mb-4">
              Stay Updated
            </h2>
            <p className="font-inter text-lg text-gray-600 mb-8">
              Subscribe to receive exclusive property listings, market insights, and luxury real estate news
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold font-inter"
                required
              />
              <Button variant="luxury" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
