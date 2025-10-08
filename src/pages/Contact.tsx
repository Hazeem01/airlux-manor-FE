import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { seoData } from "@/lib/seoData";

const Contact = () => {
  const handleWhatsappChat = () => {
    window.open("https://wa.me/2347086831671", "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={seoData.contact.title}
        description={seoData.contact.description}
        keywords={seoData.contact.keywords}
        structuredData={seoData.contact.structuredData}
      />
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="text-luxury-gold">Touch</span>
            </h1>
            <p className="font-inter text-xl text-gray-300 leading-relaxed">
              We're here to help you find your perfect luxury property
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
              <h2 className="font-playfair text-3xl font-bold text-luxury-dark mb-6">Send Us a Message</h2>
              <ContactForm source="contact-page" />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-luxury-dark mb-6">Contact Information</h2>
                <p className="font-inter text-gray-600 leading-relaxed mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you with your luxury real estate needs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-luxury-dark mb-1">Office Location</h3>
                    <p className="font-inter text-gray-600">Phase 2, Leisure Court Estate, Aco, Lugbe, Abuja, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <Phone className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-luxury-dark mb-1">Phone</h3>
                    <a href="tel:+2347086831671" className="font-inter text-gray-600 hover:text-luxury-gold transition-colors">
                      +2347086831671
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <Mail className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-luxury-dark mb-1">Email</h3>
                    <a
                      href="mailto:info@airluxmanor.com"
                      className="font-inter text-gray-600 hover:text-luxury-gold transition-colors"
                    >
                      info@airluxmanor.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <Clock className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-luxury-dark mb-1">Business Hours</h3>
                    <p className="font-inter text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-luxury-dark text-white rounded-lg p-8">
                <h3 className="font-playfair text-2xl font-bold mb-4">Prefer WhatsApp?</h3>
                <p className="font-inter text-gray-300 mb-6">
                  Chat with us directly on WhatsApp for quick responses to your inquiries.
                </p>
                <Button variant="luxury" className="w-full" onClick={handleWhatsappChat}>
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
