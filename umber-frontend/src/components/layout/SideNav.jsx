import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  HomeIcon, 
  PersonIcon, 
  GearIcon, 
  TokensIcon 
} from "@radix-ui/react-icons";

function SideNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: "home", label: "home", icon: HomeIcon },
    { id: "about", label: "about", icon: PersonIcon },
    { id: "features", label: "features", icon: GearIcon },
    { id: "pricing", label: "pricing", icon: TokensIcon },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }} // Appear after hero animation
    >
      <div className="bg-white/90 backdrop-blur-sm border border-umber-200 rounded-2xl shadow-lg p-2 overflow-visible">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative p-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-moss-100 text-moss-700' 
                    : 'text-umber-500 hover:text-umber-700 hover:bg-umber-50'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className={`absolute left-full ml-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 pointer-events-none z-50 ${
                  hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="bg-umber-600 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                    {item.label}
                  </div>
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-umber-600"></div>
                </div>

              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

export default SideNav;
