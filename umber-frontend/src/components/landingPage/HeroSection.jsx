import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import Button from "../ui/Button";
import UmberText from "../ui/UmberText";

function HeroSection() {
  const navigate = useNavigate();
  const [showRestOfPage, setShowRestOfPage] = useState(false);
  const [shrinkHeading, setShrinkHeading] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);

 
  // Typing animation for the heading text
  const headingText = "a wiser way to ";
  const wantText = "want";

  // Animation variants for rest of page elements
  const restOfPageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Handle underline completion
  const handleUnderlineComplete = () => {
    setShrinkHeading(true);
    // Start background transition slightly after shrinking begins
    setTimeout(() => setLightBackground(true), 200);
    // Delay showing rest of page until background transition is underway
    setTimeout(() => setShowRestOfPage(true), 600);
  };

  return (
    <motion.section 
      className="w-full relative overflow-hidden py-16"
      initial={{ backgroundColor: "rgb(41, 37, 36)" }} // umber-800 equivalent
      animate={{ 
        backgroundColor: lightBackground 
          ? "rgb(254, 252, 251)" // umber-50 equivalent  
          : "rgb(41, 37, 36)"
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Background Pattern - only show when light */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: lightBackground ? 0.05 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute top-20 left-10 w-24 h-24 bg-moss-600 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-ochre-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-umber-400 rounded-full blur-2xl"></div>
      </motion.div>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12"
      >
        {/* Hero Content */}
        <div className="w-full mx-auto text-center">
          {/* Large Typing Heading that shrinks */}
          <motion.div 
            className="flex items-center transition-all duration-1000 ease-in-out"
            style={{
              minHeight: shrinkHeading ? "10vh" : "20vh",
              justifyContent: shrinkHeading ? "flex-start" : "center",
              paddingTop: shrinkHeading ? "0" : "0"
            }}
          >
            <motion.h1 
              className="font-display font-light leading-tight text-center w-full"
              initial={{ 
                fontSize: "clamp(4rem, 12vw, 9rem)",
                lineHeight: "1.1",
                color: "rgb(254, 252, 251)" // umber-50 for dark background
              }}
              animate={{
                fontSize: shrinkHeading ? "clamp(2.5rem, 6vw, 6rem)" : "clamp(4rem, 12vw, 9rem)",
                lineHeight: shrinkHeading ? "1.2" : "1.1",
                color: lightBackground ? "rgb(41, 37, 36)" : "rgb(254, 252, 251)" // transition from light to dark
              }}
              transition={{ 
                fontSize: { duration: 1.2, ease: "easeInOut" },
                lineHeight: { duration: 1.2, ease: "easeInOut" },
                color: { duration: 1.5, ease: "easeInOut" }
              }}
            >
              {/* Typing effect for main text */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {headingText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.05, 
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              
              {/* "want" with underline */}
              <motion.span 
                className="italic relative inline-block"
                initial={{ 
                  opacity: 0,
                  color: "rgb(132, 204, 22)" // moss-500 for dark background
                }}
                animate={{ 
                  opacity: 1,
                  color: lightBackground ? "rgb(77, 124, 15)" : "rgb(132, 204, 22)" // transition to moss-700 for light background
                }}
                transition={{ 
                  opacity: { duration: 0.3, delay: 0.8 + headingText.length * 0.1 + 0.2 },
                  color: { duration: 1.5, ease: "easeInOut" }
                }}
              >
                {wantText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.05, 
                      delay: 0.8 + headingText.length * 0.1 + 0.3 + index * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1"
                  initial={{ 
                    width: 0,
                    backgroundColor: "rgb(132, 204, 22)" // moss-500 for dark background
                  }}
                  animate={{ 
                    width: "100%",
                    backgroundColor: lightBackground ? "rgb(77, 124, 15)" : "rgb(132, 204, 22)" // transition to moss-700
                  }}
                  transition={{ 
                    width: {
                      duration: 0.8, 
                      delay: 0.8 + headingText.length * 0.1 + wantText.length * 0.1 + 0.5,
                      ease: "easeOut",
                      onComplete: handleUnderlineComplete
                    },
                    backgroundColor: { duration: 1.5, ease: "easeInOut" }
                  }}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Rest of page content - appears after shrink */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={showRestOfPage ? "visible" : "hidden"}
            className="space-y-8 max-w-2xl mx-auto mt-6"
          >
            <motion.p 
              className="text-lg md:text-xl text-umber-600 max-w-xl mx-auto leading-relaxed mb-2"
              variants={restOfPageVariants}
            >
              <UmberText>start organizing your wants the beautiful way. create an umber within seconds.</UmberText>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
              variants={restOfPageVariants}
            >
              <Button 
                variant="contemplative" 
                size="md"
                onClick={() => navigate('/signup')}
                className="px-6 py-3"
              >
                <UmberText>begin your journey</UmberText>
              </Button>
              <Button 
                variant="outline" 
                size="md"
                onClick={() => navigate('/login')}
                className="px-6 py-3"
              >
                <UmberText>what's umber?</UmberText>
              </Button>
            </motion.div>

            <motion.p 
              className="text-umber-500 text-base "
              variants={restOfPageVariants}
            >
              <UmberText>no credit card. no spam. just clarity.</UmberText>
            </motion.p>
          </motion.div>
        </div>

      </motion.div>
    </motion.section>
  )
}

export default HeroSection;

