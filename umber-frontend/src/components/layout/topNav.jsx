import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import UmberText from "../ui/UmberText";

function TopNav({ show = true }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "howItWorks", label: "How It Works" },
    { id: "features", label: "Features" },
    // { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact Us" }
  ];

  // Initialize observer when needed
  const initializeObserver = useCallback(() => {
    if (observerRef.current) return; // Already initialized

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observerRef.current.observe(element);
      }
    });
  }, []);

  const scrollToSection = (sectionId) => {
    // Initialize observer on first interaction if not already done
    initializeObserver();
    
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-umber-100"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: show ? 0 : -100, 
          opacity: show ? 1 : 0 
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: show ? 0.3 : 0 
        }}
      >
        <div className="max-w-9xl mx-auto px-6 py-5">
          {/* Mobile Layout: 2 columns */}
          <div className="md:hidden flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-display font-semibold text-umber-800">
                <UmberText>umber</UmberText>
              </h1>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="p-3 rounded-md text-umber-600 hover:text-moss-700 hover:bg-moss-50/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <Cross1Icon className="w-7 h-7" />
              ) : (
                <HamburgerMenuIcon className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Desktop Layout: 3 columns */}
          <div className="hidden md:grid grid-cols-3 items-center">
            {/* Logo */}
            <div className="flex items-center justify-start">
              <h1 className="text-3xl font-display font-semibold text-umber-800">
                <UmberText>umber</UmberText>
              </h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex items-center justify-center space-x-8 md:space-x-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg
                    ${activeSection === item.id 
                      ? 'text-moss-700 bg-moss-50' 
                      : 'text-umber-600 hover:text-moss-700 hover:bg-moss-50/50'
                    }
                  `}
                  dangerouslySetInnerHTML={{
                    __html: item.label === "About" ? "abo<span class='italic font-family-display'>u</span>t" :
                            item.label === "Features" ? "feat<span class='italic font-family-display'>u</span>res" :
                            item.label.toLowerCase()
                  }}
                />
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/login')}
                className="text-umber-700 hover:text-umber-900 px-5 py-2.5"
              >
                log in
              </Button>
              <Button
                variant="contemplative"
                size="md"
                onClick={() => navigate('/signup')}
                className="px-5 py-2.5"
              >
                <UmberText>sign up</UmberText>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-72 h-full bg-white shadow-xl border-l border-umber-100"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="p-8 pt-24">
                {/* Mobile Navigation Links */}
                <div className="space-y-6 mb-10">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`
                        w-full text-left px-5 py-4 text-xl font-medium transition-all duration-200 rounded-lg
                        ${activeSection === item.id 
                          ? 'text-moss-700 bg-moss-50' 
                          : 'text-umber-600 hover:text-moss-700 hover:bg-moss-50/50'
                        }
                      `}
                      dangerouslySetInnerHTML={{
                        __html: item.label === "About" ? "abo<span class='italic font-family-display'>u</span>t" :
                                item.label === "Features" ? "feat<span class='italic font-family-display'>u</span>res" :
                                item.label.toLowerCase()
                      }}
                    />
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-umber-700 hover:text-umber-900 py-3"
                  >
                    log in
                  </Button>
                  <Button
                    variant="contemplative"
                    size="lg"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3"
                  >
                    <UmberText>sign up</UmberText>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TopNav;
