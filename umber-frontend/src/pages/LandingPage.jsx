import HeroSection from '../components/landingPage/HeroSection';
import TopNav from '../components/layout/topNav';
import UmberText from '../components/ui/UmberText';

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Main Content */}
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        {/* Placeholder sections for navigation */}
        <section id="about" className="min-h-screen bg-moss-50 flex items-center justify-center">
          <div className="text-center">
            <UmberText as="h2" className="text-4xl font-display text-umber-800 mb-4">About</UmberText>
            <UmberText as="p" className="text-umber-600">Learn about our mission</UmberText>
          </div>
        </section>
        
        <section id="features" className="min-h-screen bg-ochre-50 flex items-center justify-center">
          <div className="text-center">
            <UmberText as="h2" className="text-4xl font-display text-umber-800 mb-4">Features</UmberText>
            <UmberText as="p" className="text-umber-600">Discover what makes umber unique</UmberText>
          </div>
        </section>
        
        <section id="pricing" className="min-h-screen bg-umber-50 flex items-center justify-center">
          <div className="text-center">
            <UmberText as="h2" className="text-4xl font-display text-umber-800 mb-4">Pricing</UmberText>
            <UmberText as="p" className="text-umber-600">Choose your perfect plan</UmberText>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage;