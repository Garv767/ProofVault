import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Anonymous Whistleblower Inbox
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A privacy-preserving reporting system built on Midnight Network with zero-knowledge proofs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/reporter"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm"
            aria-label="Submit an anonymous report"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Submit Report
          </Link>
          <Link
            to="/moderator"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-sm"
            aria-label="Access moderator dashboard"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Moderator Access
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          title="Complete Anonymity"
          description="Zero-knowledge proofs ensure your identity remains completely hidden while proving organization membership"
        />
        <FeatureCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="Rate Limiting"
          description="Nullifier-based system prevents spam while maintaining privacy - one report per epoch per member"
        />
        <FeatureCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          title="End-to-End Encryption"
          description="Reports are encrypted client-side and only accessible to authorized moderators with proper keys"
        />
      </section>

      {/* How It Works */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="space-y-4">
          <ProcessStep
            number={1}
            title="Generate Identity"
            description="Create your anonymous identity commitment that proves membership without revealing who you are"
          />
          <ProcessStep
            number={2}
            title="Compose Report"
            description="Write your report and encrypt it with the moderator's public key for secure transmission"
          />
          <ProcessStep
            number={3}
            title="Generate Proof"
            description="Create a zero-knowledge proof of membership and rate-limit compliance"
          />
          <ProcessStep
            number={4}
            title="Submit Anonymously"
            description="Submit your encrypted report with proof - completely anonymous and verifiable"
          />
        </div>
      </Card>

      {/* Technical Details */}
      <Card className="p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Implementation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Zero-Knowledge Circuits</h3>
            <ul className="space-y-1 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Merkle tree membership proofs
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Rate-limit nullifiers (RLN)
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Poseidon hash functions
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Midnight Network</h3>
            <ul className="space-y-1 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Compact language circuits
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                On-chain proof verification
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Data protection policies
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Demo Mode Notice */}
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-gray-900">Demo Mode</h3>
            <p className="text-sm text-gray-600 mt-1">
              This is a demonstration of the Midnight Network Whistleblower system. 
              All transactions use testnet tokens with no real value. 
              For production use, proper key management and security audits are required.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="text-gray-700 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Card>
  );
};

// Process Step Component
interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
        {number}
      </div>
      <div className="ml-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default HomePage;
