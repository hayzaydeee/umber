import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import OAuthCompletion from './pages/OAuthCompletion';
import Dashboard from './pages/Dashboard';
import ApiTest from './components/ApiTest';
import DataIntegrationExample from './components/DataIntegrationExample';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="w-full min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/oauth-completion" element={<OAuthCompletion />} />
              <Route path="/api-test" element={<ApiTest />} />
              <Route path="/data-test" element={<DataIntegrationExample />} />
              {/* <Route path="/dashboard" element={<OnboardingExperience />} /> */}
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
