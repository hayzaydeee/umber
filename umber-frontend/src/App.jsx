import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ForgotPassword from './pages/ForgotPassword';
import OAuthCompletion from './pages/OAuthCompletion';
import Dashboard from './pages/Dashboard';
import OnboardingTest from './pages/OnboardingTest';
import MagicAuth from './pages/MagicAuth';
import AuthSuccess from './pages/AuthSuccess';
import AuthError from './pages/AuthError';
import ApiTest from './components/ApiTest';
import DataIntegrationExample from './components/DataIntegrationExample';
import MagicLinkTester from './components/MagicLinkTester';
import FlowDebugger from './components/onboarding/FlowDebugger';
import { ThemeProvider } from './contexts/ThemeContext';
import { FlowMachineProvider } from './contexts/FlowMachineContext';
import { UIProvider } from './contexts/UIContext';
import { AuthProvider } from './hooks/useAuth.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FlowMachineProvider>
          <UIProvider>
            <Router>
              <div className="w-full min-h-screen">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<MagicAuth />} />
                  <Route path="/auth/verify" element={<AuthSuccess />} />
                  <Route path="/auth/success" element={<AuthSuccess />} />
                  <Route path="/auth/error" element={<AuthError />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/oauth-completion" element={<OAuthCompletion />} />
                  <Route path="/api-test" element={<ApiTest />} />
                  <Route path="/data-test" element={<DataIntegrationExample />} />
                  <Route path="/flow-test" element={<FlowDebugger />} />
                  <Route path="/onboarding-test" element={<OnboardingTest />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
            </Router>
          </UIProvider>
        </FlowMachineProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
