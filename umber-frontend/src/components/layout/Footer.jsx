import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  TwitterLogoIcon, 
  InstagramLogoIcon, 
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
  HeartIcon,
  ArrowTopRightIcon
} from "@radix-ui/react-icons";
import UmberText from "../ui/UmberText";
import Modal from "../ui/Modal";
import ContactForm from "../forms/ContactForm";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  const handleContactSuccess = (formData) => {
    console.log('Contact form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "features", href: "#features" },
        { name: "pricing", href: "#pricing" },
        { name: "how it works", href: "#how-it-works" },
        // { name: "Mobile app", href: "/app" },
        // { name: "API", href: "/api" },
        // { name: "Integrations", href: "/integrations" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "about us", href: "/about" },
        { name: "contact", href: "/contact", onClick: handleContactClick },
        // { name: "Blog", href: "/blog" },
        // { name: "Careers", href: "/careers" },
        // { name: "Press kit", href: "/press" },     
        // { name: "Partners", href: "/partners" }
      ]
    },
    // {
    //   title: "Resources",
    //   links: [
    //     { name: "Help center", href: "/help" },
    //     { name: "Community", href: "/community" },
    //     { name: "Guides", href: "/guides" },
    //     { name: "Webinars", href: "/webinars" },
    //     { name: "Status", href: "/status" },
    //     { name: "Changelog", href: "/changelog" }
    //   ]
    // },
    // {
    //   title: "Legal",
    //   links: [
    //     { name: "Privacy policy", href: "/privacy" },
    //     { name: "Terms of service", href: "/terms" },
    //     { name: "Cookie policy", href: "/cookies" },
    //     { name: "GDPR", href: "/gdpr" },
    //     { name: "Security", href: "/security" },
    //     { name: "Accessibility", href: "/accessibility" }
    //   ]
    // }
  ];

  const socialLinks = [
    { icon: TwitterLogoIcon, href: "https://twitter.com/umberapp", label: "Twitter" },
    { icon: InstagramLogoIcon, href: "https://instagram.com/umberapp", label: "Instagram" },
    { icon: LinkedInLogoIcon, href: "https://linkedin.com/company/umberapp", label: "LinkedIn" },
    { icon: GitHubLogoIcon, href: "https://github.com/umberapp", label: "GitHub" }
  ];

  return (
    <footer className="bg-umber-700 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <UmberText className="font-family-display text-3xl font-bold text-white">umber</UmberText>
                </div>

                <p className="text-umber-100 mb-6 leading-relaxed">
                  <UmberText>
                    start organizing your wants the beautiful way. create an umber within seconds.
                  </UmberText>
                </p>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-umber-600/30 hover:bg-umber-500/40 rounded-lg flex items-center justify-center text-umber-100 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <div key={section.title} className="col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-white font-semibold mb-4">
                    <UmberText>{section.title}</UmberText>
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          onClick={link.onClick}
                          className="text-umber-200 hover:text-white transition-colors text-sm group flex items-center cursor-pointer"
                        >
                          <UmberText>{link.name}</UmberText>
                          {link.href.startsWith('http') && (
                            <ArrowTopRightIcon className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <motion.div 
          className="border-t border-umber-200 py-8 md:py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-display font-bold text-umber-800 mb-4">
              <UmberText>Stay mindful with our newsletter</UmberText>
            </h3>
            <p className="text-umber-600 mb-6">
              <UmberText>
                Get weekly insights on contemplative commerce, mindful consumption, 
                and thoughtful desire management.
              </UmberText>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-umber-300 rounded-lg focus:ring-2 focus:ring-ochre-500 focus:border-transparent outline-none bg-white"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-ochre-500 to-ochre-600 hover:from-ochre-600 hover:to-ochre-700 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
                <UmberText>Subscribe</UmberText>
              </button>
            </div>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-umber-500/30 py-6 flex flex-col md:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-umber-300 text-sm text-center">
            <UmberText>
              © {currentYear} hayzaydee. all rights reserved.
            </UmberText>
          </div>
          
        </motion.div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Us"
        size="md"
      >
        <ContactForm
          onSuccess={handleContactSuccess}
          onClose={() => setIsContactModalOpen(false)}
        />
      </Modal>
    </footer>
  );
}

export default Footer;
