import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Excellence",
      description: "We deliver only the highest standards in service and results.",
    },
    {
      title: "Trust",
      description: "We build lasting relationships through honesty and reliability.",
    },
    {
      title: "Innovation",
      description: "We use modern strategies and creative solutions to stand out.",
    },
    {
      title: "Client-Centered",
      description: "Every decision and service is tailored to meet our clients' needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-luxury-gold">Airlux Manor</span>
            </h1>
            <p className="font-inter text-xl text-gray-300 leading-relaxed">
              Where luxury meets trust in Nigerian real estate
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to <span className="font-semibold text-luxury-dark">Airlux Manor</span> — where luxury meets trust in Nigerian real estate.
            </p>
            <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
              At Airlux, we believe a home is more than a transaction — it is a lifestyle, a sense of security, and a legacy. Founded with a vision to redefine luxury living in Nigeria, we combine exclusivity, transparency, and modern design to deliver timeless value.
            </p>
            <p className="font-inter text-lg text-gray-700 leading-relaxed">
              From high-rise apartments to serene villas and prime land investments, we connect discerning clients with properties that reflect their aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-luxury-gold">
              <h2 className="font-playfair text-3xl font-bold text-luxury-dark mb-4">Our Mission</h2>
              <p className="font-inter text-gray-700 leading-relaxed">
                To provide seamless access to luxury real estate by building trust, delivering value, and curating properties that elevate modern living.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-luxury-gold">
              <h2 className="font-playfair text-3xl font-bold text-luxury-dark mb-4">Our Vision</h2>
              <p className="font-inter text-gray-700 leading-relaxed">
                To become Africa's most trusted name in luxury real estate — blending innovation, integrity, and sophistication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">Our Values</h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-6">
                  <CheckCircle2 className="text-luxury-gold" size={32} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-3">{value.title}</h3>
                <p className="font-inter text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-luxury-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8">
              Why Choose <span className="text-luxury-gold">Airlux Manor</span>?
            </h2>
            <p className="font-inter text-lg text-gray-300 leading-relaxed mb-8">
              We don't just sell properties — we create experiences and build lasting relationships. Our commitment to transparency, quality, and client satisfaction sets us apart in the Nigerian luxury real estate market.
            </p>
            <p className="font-inter text-lg text-gray-300 leading-relaxed">
              Whether you're looking for your dream home, a strategic investment, or expert guidance in the real estate market, Airlux Manor is your trusted partner every step of the way.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
