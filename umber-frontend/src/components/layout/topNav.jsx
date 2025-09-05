import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import UmberText from "../ui/UmberText";

function TopNav() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-umber-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-display font-semibold text-umber-800">
              <span className="italic font-family-display">u</span>mber
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  px-3 py-2 text-md font-medium transition-all duration-200 rounded-md
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

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-umber-700 hover:text-umber-900"
            >
              log in
            </Button>
            <Button
              variant="contemplative"
              size="sm"
              onClick={() => navigate('/signup')}
              className="px-4 py-2"
            >
              <UmberText>sign up</UmberText>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
