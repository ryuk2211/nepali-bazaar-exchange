
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nepx-primary text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Nep<span className="text-nepx-secondary">X</span>
            </h2>
            <p className="text-sm text-gray-300">
              The premier marketplace for sneakers, apparel, and collectibles in Nepal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-nepx-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-nepx-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-nepx-secondary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/category/sneakers" className="hover:text-nepx-secondary transition-colors">Sneakers</Link></li>
              <li><Link to="/category/apparel" className="hover:text-nepx-secondary transition-colors">Apparel</Link></li>
              <li><Link to="/category/collectibles" className="hover:text-nepx-secondary transition-colors">Collectibles</Link></li>
              <li><Link to="/category/electronics" className="hover:text-nepx-secondary transition-colors">Electronics</Link></li>
              <li><Link to="/category/trading-cards" className="hover:text-nepx-secondary transition-colors">Trading Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/help/faq" className="hover:text-nepx-secondary transition-colors">FAQs</Link></li>
              <li><Link to="/help/shipping" className="hover:text-nepx-secondary transition-colors">Shipping</Link></li>
              <li><Link to="/help/returns" className="hover:text-nepx-secondary transition-colors">Returns</Link></li>
              <li><Link to="/help/how-to-buy" className="hover:text-nepx-secondary transition-colors">How to Buy</Link></li>
              <li><Link to="/help/how-to-sell" className="hover:text-nepx-secondary transition-colors">How to Sell</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-nepx-secondary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-nepx-secondary transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-nepx-secondary transition-colors">Press</Link></li>
              <li><Link to="/authenticity" className="hover:text-nepx-secondary transition-colors">Authenticity</Link></li>
              <li><Link to="/contact" className="hover:text-nepx-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              &copy; {currentYear} NepX. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-nepx-secondary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-nepx-secondary transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-nepx-secondary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
