import HeroSection from '../components/landingPage/HeroSection';
import TopNav from '../components/layout/topNav';
import SideNav from '../components/layout/SideNav';

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Floating Side Navigation */}
      <SideNav />
      
      {/* Main Content */}
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        {/* Placeholder sections for navigation */}
        <section id="about" className="min-h-screen bg-moss-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-display text-umber-800 mb-4">Abo<span className="italic">u</span>t</h2>
            <p className="text-umber-600">Learn about o<span className="italic">u</span>r mission</p>
          </div>
        </section>
        
        <section id="features" className="min-h-screen bg-ochre-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-display text-umber-800 mb-4">Feat<span className="italic">u</span>res</h2>
            <p className="text-umber-600">Discover what makes <span className="italic">u</span>mber <span className="italic">u</span>niq<span className="italic">u</span>e</p>
          </div>
        </section>
        
        <section id="pricing" className="min-h-screen bg-umber-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-display text-umber-800 mb-4">Pricing</h2>
            <p className="text-umber-600">Choose yo<span className="italic">u</span>r perfect plan</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage;