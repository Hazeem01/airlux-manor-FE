import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Building2, Calendar } from "lucide-react";
import { seoData } from "@/lib/seoData";

const Properties = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={seoData.properties.title}
        description={seoData.properties.description}
        keywords={seoData.properties.keywords}
        structuredData={seoData.properties.structuredData}
      />
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Luxury <span className="text-luxury-gold">Properties</span>
            </h1>
            <p className="font-inter text-xl text-gray-300 leading-relaxed">
              Exclusive listings curated for discerning clients
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-luxury-gold/10 rounded-full mb-8">
              <Building2 className="text-luxury-gold" size={48} />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-6">
              Coming Soon
            </h2>
            <p className="font-inter text-xl text-gray-600 leading-relaxed mb-8">
              We're carefully curating an exclusive portfolio of luxury properties in Abuja's most prestigious locations. Our listings will feature high-rise apartments, serene villas, and prime land investments.
            </p>
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="text-luxury-gold mr-3" size={24} />
                <p className="font-inter font-semibold text-luxury-dark">
                  Be the first to know when we launch
                </p>
              </div>
              <p className="font-inter text-gray-600 mb-6">
                Subscribe to our newsletter and get exclusive early access to our property listings.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold font-inter"
                  required
                />
                <Button variant="luxury" size="lg">
                  Notify Me
                </Button>
              </form>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <p className="font-playfair text-4xl font-bold text-luxury-gold mb-2">100+</p>
                <p className="font-inter text-gray-600">Properties Coming</p>
              </div>
              <div className="text-center">
                <p className="font-playfair text-4xl font-bold text-luxury-gold mb-2">10+</p>
                <p className="font-inter text-gray-600">Prime Locations</p>
              </div>
              <div className="text-center">
                <p className="font-playfair text-4xl font-bold text-luxury-gold mb-2">24/7</p>
                <p className="font-inter text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-luxury-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Have a Specific Property in Mind?
            </h2>
            <p className="font-inter text-lg text-gray-300 leading-relaxed mb-8">
              Our team is ready to help you find the perfect luxury property that matches your exact requirements. Contact us today for personalized assistance.
            </p>
            <Button variant="luxury" size="lg">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
