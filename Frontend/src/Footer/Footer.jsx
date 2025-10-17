import React from 'react';
import { Twitter, Dribbble, Linkedin, DollarSign , Brain } from 'lucide-react';
import './Footer.css'


const COMPANY_INFO = {
  name: "Byteguru",
  tagline: "Smart Instant insights, powered by intelligence",
  copyrightYear: new Date().getFullYear(),
};

const PRODUCT_LINKS = [
  { name: 'Features', href: '#' },
  { name: 'Launch App', href: '#' },
  { name: 'About Us', href: '#' },
];

const SUPPORT_LINKS = [
  { name: 'Contact', href: '#' },
  { name: 'Help Center', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];



const FooterColumn = ({ title, links }) => (
  <div className="link-column">
    <h3 className="column-title">
      {title}
    </h3>
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="link-item"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);



const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-inner">

        <div className="footer-content-grid">

          <div className="branding-section">
            <div className="logo-group">
              <div className="logo-icon-container">
                <Brain className="logo-icon" />
              </div>
              <span className="logo-name">{COMPANY_INFO.name}</span>
            </div>
            <p className="tagline">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          <div className="product-links">
            <FooterColumn title="Product" links={PRODUCT_LINKS} />
          </div>

          <div className="support-links">
            <FooterColumn title="Support" links={SUPPORT_LINKS} />
          </div>

         
          <div className="connect-section">
            <h3 className="column-title">
              Connect
            </h3>
            <div className="social-links-group">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="social-icon-link"
                  aria-label={item.label}
                >
                  <item.icon className="social-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>

     
        <div className="copyright-section">
          <p className="copyright-text">
            &copy; {COMPANY_INFO.copyrightYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};



const App = () => {
  return (
    <>
      <div className="app-container">       
        {/* The Footer Component */}
        <Footer />
      </div>
    </>
  );
};

export default App;
