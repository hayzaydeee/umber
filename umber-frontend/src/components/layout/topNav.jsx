import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function TopNav() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-umber-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-display font-semibold text-umber-800">
              <span className="italic">u</span>mber
            </h1>
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
              sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
