import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Import the logo
import logoImage from "../../../assets/images/careerist-logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Who it's for", href: "#audiences" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center">
      <header className="bg-brand-ink text-brand-mist w-full max-w-5xl rounded-full shadow-2xl px-6 py-4 flex justify-between items-center transition-all duration-300">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img 
            src={logoImage}
            alt="Careerist Logo" 
            className="h-8 w-auto brightness-0 invert" 
          />
          <span className="text-xl font-display font-bold tracking-wide">
            careerist
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-brand-neon transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Auth & CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/auth" className="text-sm font-medium hover:text-brand-neon transition-colors duration-200">
            Sign in
          </Link>
          <Link 
            to="/auth" 
            className="bg-brand-mist text-brand-ink hover:bg-brand-neon hover:text-brand-ink px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-brand-mist hover:text-brand-neon focus:outline-none transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-brand-ink rounded-3xl shadow-xl p-4 md:hidden border border-gray-800 animate-slide-up">
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-brand-mist hover:text-brand-neon px-4 py-2 text-lg font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="h-px bg-gray-800 my-2"></div>
            <Link 
              to="/auth" 
              className="text-brand-mist hover:text-brand-neon px-4 py-2 text-lg font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link 
              to="/auth" 
              className="bg-brand-mist text-brand-ink hover:bg-brand-neon text-center px-4 py-3 rounded-full text-lg font-bold transition-colors duration-200 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;