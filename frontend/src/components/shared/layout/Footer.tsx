import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/careerist-logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-ink text-brand-mist py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
               <img 
                 src={logoImage}
                 alt="Careerist Logo" 
                 className="h-8 w-auto brightness-0 invert" 
               />
               <span className="text-2xl font-display font-bold">
                 careerist
               </span>
            </Link>
            <p className="text-brand-slate text-sm max-w-sm mb-6">
              AI-driven career clarity for the modern student. Build the future you actually want.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-brand-slate">
              <li><a href="#how-it-works" className="hover:text-brand-neon transition-colors">How it Works</a></li>
              <li><a href="#features" className="hover:text-brand-neon transition-colors">Features</a></li>
              <li><a href="#audiences" className="hover:text-brand-neon transition-colors">Who it's for</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-brand-slate">
              <li><a href="#" className="hover:text-brand-neon transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-neon transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-neon transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-neon transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-brand-slate">
          <p>© {new Date().getFullYear()} Careerist. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
             <a href="#" className="hover:text-brand-neon transition-colors">Twitter</a>
             <a href="#" className="hover:text-brand-neon transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-brand-neon transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;