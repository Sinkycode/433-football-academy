import { footerLinks, socialMedia } from "../constants";
import PropTypes from "prop-types";

const FooterColumn = ({ title, children }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-white font-montserrat text-xl font-semibold">
      {title}
    </h4>
    {children}
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-container">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Brand Column */}
        <div className="flex flex-col gap-4 flex-1">
          <a href="/" className="text-white text-2xl font-bold">
            433 Academy
          </a>
          <p className="text-white-400 text-base leading-7 mt-4 max-w-sm">
            Empowering young athletes to achieve their dreams through
            professional football training and development.
          </p>
          <div className="flex gap-4 mt-6">
            {socialMedia.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-coral-red transition-colors"
              >
                <social.icon size={20} color="#000" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-1 justify-between lg:justify-around flex-wrap gap-12">
          <FooterColumn title="Quick Links">
            <ul className="text-white-400 space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="hover:text-coral-red transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Programs */}
          <FooterColumn title="Programs">
            <ul className="text-white-400 space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="hover:text-coral-red transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Newsletter */}
          <FooterColumn title="Newsletter">
            <p className="text-white-400">
              Subscribe to stay updated with our latest news and events.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red"
              />
              <button
                type="submit"
                className="bg-coral-red text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white-400 border-t border-white/10 mt-12 pt-8">
        <p>© {currentYear} Football Academy. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="/privacy" className="hover:text-coral-red transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-coral-red transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

FooterColumn.prototype = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Footer;
