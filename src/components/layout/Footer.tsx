import { Link } from "react-router-dom";
import {
  Wallet,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Features", href: "/features" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/career" },
    ],
    support: [
      { name: "Help Center", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/help" },
      { name: "Security", href: "/security" },
    ],
    services: [
      { name: "Send Money", href: "/send" },
      { name: "Wallet", href: "/wallet" },
      { name: "Exchange Rates", href: "/rates" },
      { name: "Business", href: "/business" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://www.linkedin.com/in/azir9200/",
      icon: Twitter,
    },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Instagram", href: "#", icon: Instagram },
  ];

  return (
    <footer className=" border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className=" p-2 rounded-lg">
                  <Wallet className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold ">Transactly</span>
              </Link>
              <p className=" mb-6 max-w-sm">
                Secure, fast, and affordable international money transfers.
                Trusted by millions worldwide for seamless financial solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm ">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@transactly.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+353838485737</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Dublin-3, Ireland</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="font-semibold  mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className=" hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold  mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className=" hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-smooth"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground">
                  © {currentYear} RemitSwift. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Licensed and regulated financial service provider
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
