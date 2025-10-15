import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import Button from "../ui/Button";
import logoImage from "../../../assets/images/careerist-logo.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Success Stories", href: "#testimonials" },
    { name: "About Us", href: "#about" },
    { name: "AI Chat", href: "/chat" },
  ];

  const resources = [
    { name: "Career Blog", href: "#", badge: "New" },
    { name: "Industry Reports", href: "#" },
    { name: "Salary Guide", href: "#" },
    { name: "Interview Tips", href: "#" },
    { name: "Resume Templates", href: "#" },
  ];

  const company = [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#", badge: "Hiring!" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ];

  const trustIndicators = [
    { icon: <Shield className="h-5 w-5" />, text: "SOC 2 Compliant" },
    { icon: <Globe className="h-5 w-5" />, text: "Global Reach" },
    { icon: <Zap className="h-5 w-5" />, text: "99.9% Uptime" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#2B3674] via-gray-900 to-[#2B3674] text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#3EBFB0] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#C8A860] rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Stay Ahead in Your Career Journey
              </h3>
              <p className="text-gray-300 text-lg">
                Get weekly insights, career tips, and exclusive resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3EBFB0] focus:border-transparent transition-all"
              />
              <Button className="bg-gradient-to-r from-[#3EBFB0] to-[#C8A860] hover:shadow-xl transform hover:scale-105 transition-all group">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <img 
                  src={logoImage}
                  alt="Careerist Logo" 
                  className="h-12 w-auto group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <span className="text-2xl font-bold group-hover:text-[#3EBFB0] transition-colors">
                    Careerist
                  </span>
                  <div className="text-sm text-gray-400">AI Career Guidance</div>
                </div>
              </Link>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Empowering careers through AI-driven insights and personalized guidance. 
                Join thousands who have transformed their professional lives.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3EBFB0] transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-4">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-[#3EBFB0]">{indicator.icon}</span>
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[#3EBFB0] transition-colors flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Resources
              </h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      className="text-gray-300 hover:text-[#3EBFB0] transition-colors flex items-center group"
                    >
                      <span>{resource.name}</span>
                      {resource.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-[#3EBFB0] text-white text-xs rounded-full">
                          {resource.badge}
                        </span>
                      )}
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-[#3EBFB0] transition-colors flex items-center group"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-[#C8A860] text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-[#3EBFB0]" />
                  <a
                    href="mailto:hello@careerist.ai"
                    className="hover:text-[#3EBFB0] transition-colors"
                  >
                    hello@careerist.ai
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-gray-400 text-sm">
              <span>© {currentYear} Careerist AI. Made with</span>
              <Heart className="h-4 w-4 text-[#C8A860] mx-1" />
              <span>for your career success.</span>
            </div>

            <div className="flex items-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-[#3EBFB0] text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;