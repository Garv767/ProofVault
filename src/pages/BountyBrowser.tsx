import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Bounty {
  id: number;
  title: string;
  reward: string;
  category: string;
  isOpen: boolean;
}

const mockBounties: Bounty[] = [
  { id: 1, title: 'Corruption in City Council', reward: '0.5', category: 'Politics', isOpen: true },
  { id: 2, title: 'Environmental Violations at Factory', reward: '1.2', category: 'Environment', isOpen: true },
  { id: 3, title: 'Financial Fraud at Startup', reward: '2.0', category: 'Finance', isOpen: true },
];

const categories = ['All', 'Politics', 'Environment', 'Finance', 'Healthcare', 'Other'];

const categoryColors: Record<string, string> = {
  Politics: 'bg-blue-900 text-blue-200',
  Environment: 'bg-green-900 text-green-200',
  Finance: 'bg-yellow-900 text-yellow-200',
  Healthcare: 'bg-red-900 text-red-200',
  Other: 'bg-gray-700 text-gray-200',
};

export default function BountyBrowser() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = mockBounties.filter(
    (b) => selectedCategory === 'All' || b.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Bounties</h1>
          <p className="text-gray-400">
            Find open investigations and submit tips to earn rewards.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bounty Cards */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No bounties found for this category.
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((bounty) => (
              <div
                key={bounty.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        categoryColors[bounty.category] ?? 'bg-gray-700 text-gray-200'
                      }`}
                    >
                      {bounty.category}
                    </span>
                    {bounty.isOpen && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300">
                        Open
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-white">{bounty.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Reward:{' '}
                    <span className="text-yellow-400 font-medium">{bounty.reward} MATIC</span>
                  </p>
                </div>

                <Link
                  to={`/reporter?bountyId=${bounty.id}`}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  Submit Tip
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-3">Know of an issue that needs investigating?</p>
          <Link
            to="/create-bounty"
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            + Post a Bounty
          </Link>
        </div>
      </div>
    </div>
  );
}
