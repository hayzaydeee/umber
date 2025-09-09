import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import OAuthCompletion from './pages/OAuthCompletion';
import Dashboard from './pages/Dashboard';
import SeamlessOnboardingExperience from './components/onboarding/SeamlessOnboardingExperience';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <OnboardingProvider>
        <Router>
          <div className="w-full min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/oauth-completion" element={<OAuthCompletion />} />
            <Route path="/dashboard" element={<SeamlessOnboardingExperience />} />
          </Routes>
        </div>
      </Router>
      </OnboardingProvider>
    </ThemeProvider>
  )
}

export default App
