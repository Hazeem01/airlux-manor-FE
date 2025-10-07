import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logoLight from "@/assets/logo-light.png";

const Footer = () => {
  return (
    <footer className="bg-luxury-darker text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src={logoLight} alt="Airlux Manor" className="h-16 w-auto mb-6" />
            <p className="font-inter text-sm text-gray-400 leading-relaxed">
              Luxury Real Estate. Trusted Investments. Timeless Value.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* <a href="https://www.instagram.com/airluxmanor?igsh=MXBnb2pvOGdpYnVlMQ%3D%3D&utm_source=qr" className="text-luxury-gold hover:text-luxury-gold-light transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a> */}
              <a href="https://www.instagram.com/airluxmanor?igsh=MXBnb2pvOGdpYnVlMQ%3D%3D&utm_source=qr" className="text-luxury-gold hover:text-luxury-gold-light transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              {/* <a href="https://www.instagram.com/airluxmanor?igsh=MXBnb2pvOGdpYnVlMQ%3D%3D&utm_source=qr" className="text-luxury-gold hover:text-luxury-gold-light transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a> */}
              <a href="https://www.linkedin.com/company/airlux-manor" className="text-luxury-gold hover:text-luxury-gold-light transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6 text-luxury-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">Services</Link></li>
              <li><Link to="/properties" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">Properties</Link></li>
              <li><Link to="/blog" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6 text-luxury-gold">Our Services</h3>
            <ul className="space-y-3">
              <li className="font-inter text-sm text-gray-400">Property Sales</li>
              <li className="font-inter text-sm text-gray-400">Property Leasing</li>
              <li className="font-inter text-sm text-gray-400">Real Estate Advisory</li>
              <li className="font-inter text-sm text-gray-400">Investment Opportunities</li>
              <li className="font-inter text-sm text-gray-400">Property Management</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6 text-luxury-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-luxury-gold mt-1 flex-shrink-0" />
                <span className="font-inter text-sm text-gray-400">Phase 2, Leisure Court Estate, Aco, Lugbe, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-luxury-gold flex-shrink-0" />
                <a href="tel:+2347086831671" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">+2347086831671</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-luxury-gold flex-shrink-0" />
                <a href="mailto:info@airluxmanor.com" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">info@airluxmanor.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-gold/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-sm text-gray-400">
              © {new Date().getFullYear()} Airlux Manor. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="font-inter text-sm text-gray-400 hover:text-luxury-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
