import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeroSection from '../components/landingPage/HeroSection';
import AboutSection from '../components/landingPage/AboutSection';
import HowItWorksSection from '../components/landingPage/HowItWorksSection';
import FeaturesSection from '../components/landingPage/FeaturesSection';
import WhyUmberMobileSection from '../components/landingPage/WhyUmberMobileSection';
import PricingSection from '../components/landingPage/PricingSection';
import CTASection from '../components/landingPage/CTASection';
import TopNav from '../components/layout/TopNav';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

function LandingPage() {
  const [showTopNav, setShowTopNav] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if user wants to force view the landing page
  const forceView = searchParams.get('force') === 'true';

  // Redirect authenticated users to dashboard (unless forced to stay)
  useEffect(() => {
    if (!loading && isAuthenticated && !forceView) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate, forceView]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-moss-50 via-white to-ochre-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-moss-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-umber-600">Loading...</p>
        </div>
      </div>
    );
  }

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