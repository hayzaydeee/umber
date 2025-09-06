import React, { useState } from 'react';
import HeroSection from '../components/landingPage/HeroSection';
import AboutSection from '../components/landingPage/AboutSection';
import HowItWorksSection from '../components/landingPage/HowItWorksSection';
import FeaturesSection from '../components/landingPage/FeaturesSection';
import WhyUmberMobileSection from '../components/landingPage/WhyUmberMobileSection';
import PricingSection from '../components/landingPage/PricingSection';
import CTASection from '../components/landingPage/CTASection';
import TopNav from '../components/layout/topNav';
import Footer from '../components/layout/Footer';
import UmberText from '../components/ui/UmberText';

function LandingPage() {
  const [showTopNav, setShowTopNav] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* Top Navigation */}
      <TopNav show={showTopNav} />
      
      {/* Main Content */}
      <main>
        <section id="home">
          <HeroSection onAnimationComplete={() => setShowTopNav(true)} />
        </section>
        
        {/* About Section */}
        <AboutSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Why Umber Mobile Section - Only shows on mobile after Features */}
        <WhyUmberMobileSection />
        
        {/* Pricing Section */}
       {/* <PricingSection /> */}
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage;