import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TipsterPage from './pages/TipsterPage';
import InvestigatorPage from './pages/InvestigatorPage';
import PublicStatsPage from './pages/PublicStatsPage';
import SettingsPage from './pages/SettingsPage';
import PrivacyPage from './pages/PrivacyPage';
import { MetricsPage } from './pages/MetricsPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation - Bubble Style */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors duration-200"
              aria-label="ProofVault Home"
            >
              <span className="text-xl">🔐</span>
              <span className="font-semibold text-lg">ProofVault</span>
            </Link>

            {/* Navigation Bubble */}
            <div className="hidden sm:flex items-center bg-gray-50 rounded-full px-1 py-1 shadow-sm border border-gray-100">
              <NavLink to="/" current={location.pathname === '/'}>
                Home
              </NavLink>
              <NavLink to="/reporter" current={location.pathname === '/reporter'}>
                Submit Report
              </NavLink>
              <NavLink to="/moderator" current={location.pathname === '/moderator'}>
                Moderator
              </NavLink>
              <NavLink to="/stats" current={location.pathname === '/stats'}>
                Statistics
              </NavLink>
              <NavLink to="/metrics" current={location.pathname === '/metrics'}>
                Metrics
              </NavLink>
              <NavLink to="/privacy" current={location.pathname === '/privacy'}>
                Privacy
              </NavLink>
              <NavLink to="/settings" current={location.pathname === '/settings'}>
                Settings
              </NavLink>
            </div>

            {/* Right side actions */}
            <div className="flex items-center">
              <a 
                href="https://github.com/Garv767/ProofVault" 
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 bg-black text-white px-4 py-2 rounded-md">
        Skip to main content
      </a>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reporter" element={<TipsterPage />} />
          <Route path="/moderator" element={<InvestigatorPage />} />
          <Route path="/stats" element={<PublicStatsPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              Built with 🔐 for the Midnight Network "Privacy First" Challenge
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-6">
              <a 
                href="https://github.com/Garv767/ProofVault" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="View source on GitHub"
              >
                GitHub
              </a>
              <a 
                href="https://docs.midnight.network" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Midnight Network Documentation"
              >
                Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Navigation Link Component
interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

function NavLink({ to, current, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
        current
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
      aria-current={current ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

export default App;
