import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Lightbulb, Award } from "lucide-react";
import { seoData } from "@/lib/seoData";

const Blog = () => {
  const blogCategories = [
    {
      icon: TrendingUp,
      title: "Market Trends",
      description: "Stay updated on the latest developments in Nigeria's luxury real estate market.",
    },
    {
      icon: Lightbulb,
      title: "Investment Tips",
      description: "Expert advice on maximizing returns from your property investments.",
    },
    {
      icon: BookOpen,
      title: "Buyer's Guides",
      description: "Comprehensive guides to help you navigate the property buying process.",
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Real stories from satisfied clients who found their dream properties.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={seoData.blog.title}
        description={seoData.blog.description}
        keywords={seoData.blog.keywords}
        structuredData={seoData.blog.structuredData}
      />
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Real Estate <span className="text-luxury-gold">Insights</span>
            </h1>
            <p className="font-inter text-xl text-gray-300 leading-relaxed">
              Expert knowledge and market intelligence for informed decisions
            </p>
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">
              What We Cover
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              In-depth articles and insights to help you make informed real estate decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {blogCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                  <category.icon className="text-luxury-gold" size={28} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-3">
                  {category.title}
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-gray-50 py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-luxury-gold/10 rounded-full mb-8">
              <BookOpen className="text-luxury-gold" size={48} />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-6">
              Blog Coming Soon
            </h2>
            <p className="font-inter text-xl text-gray-600 leading-relaxed mb-8">
              We're preparing valuable content to help you navigate the Nigerian luxury real estate market. Subscribe to our newsletter to be notified when we publish our first articles.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="font-inter font-semibold text-luxury-dark mb-6">
                Get exclusive real estate insights delivered to your inbox
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
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-dark mb-12 text-center">
              Topics We'll Be Covering
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Understanding Property Values in Abuja",
                "Tax Benefits of Real Estate Investment",
                "How to Spot Prime Investment Locations",
                "Luxury Property Maintenance Tips",
                "Legal Considerations When Buying Property",
                "Financing Options for Premium Properties",
                "Market Outlook: Nigerian Real Estate 2025",
                "Building Your Property Portfolio",
              ].map((topic, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></span>
                  <p className="font-inter text-gray-700">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
