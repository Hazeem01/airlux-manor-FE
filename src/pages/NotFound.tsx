import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO 
        title="Page Not Found - 404 | Airlux Manor"
        description="The page you're looking for doesn't exist. Return to Airlux Manor to explore luxury real estate in Abuja, Nigeria."
        keywords="404, page not found, Airlux Manor"
      />
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="font-playfair text-9xl font-bold text-luxury-gold mb-4">404</h1>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">
              Page Not Found
            </h2>
            <p className="font-inter text-xl text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-white px-8 py-6 text-lg">
                <Home className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="border-luxury-dark text-luxury-dark hover:bg-luxury-dark hover:text-white px-8 py-6 text-lg">
                <Search className="mr-2" size={20} />
                View Properties
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="font-inter text-gray-500 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-luxury-gold hover:underline">About Us</Link>
              <span className="text-gray-300">•</span>
              <Link to="/properties" className="text-luxury-gold hover:underline">Properties</Link>
              <span className="text-gray-300">•</span>
              <Link to="/services" className="text-luxury-gold hover:underline">Services</Link>
              <span className="text-gray-300">•</span>
              <Link to="/blog" className="text-luxury-gold hover:underline">Blog</Link>
              <span className="text-gray-300">•</span>
              <Link to="/contact" className="text-luxury-gold hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
