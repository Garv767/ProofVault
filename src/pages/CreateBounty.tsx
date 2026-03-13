import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Politics', 'Environment', 'Finance', 'Healthcare', 'Other'];

interface FormData {
  title: string;
  description: string;
  category: string;
  reward: string;
}

const initialForm: FormData = {
  title: '',
  description: '',
  category: 'Politics',
  reward: '',
};

export default function CreateBounty() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.title.trim()) {
      setErrorMsg('Title is required.');
      return;
    }
    if (!formData.reward || isNaN(Number(formData.reward)) || Number(formData.reward) <= 0) {
      setErrorMsg('Please enter a valid reward amount.');
      return;
    }

    setIsLoading(true);
    try {
      // Placeholder — replace with real wagmi useWriteContract call once ABI is available:
      // const rewardWei = parseEther(formData.reward);
      // await writeContract({ address: VITE_BOUNTY_ESCROW_ADDRESS, abi: BountyEscrowABI,
      //   functionName: 'createBounty', args: [...], value: rewardWei });
      console.log('would submit:', formData);

      // Simulate async tx delay
      await new Promise((r) => setTimeout(r, 1200));

      setSuccessMsg('Bounty posted successfully! Investigators will be notified.');
      setFormData(initialForm);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/bounties"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors mb-4 inline-block"
          >
            ← Back to Bounties
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Post a Bounty</h1>
          <p className="text-gray-400">
            Offer a MATIC reward for verified tips on a topic of public interest.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Corruption in City Council"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what kind of evidence or tip you're looking for..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Reward */}
            <div>
              <label htmlFor="reward" className="block text-sm font-medium text-gray-300 mb-1">
                Reward (MATIC) <span className="text-red-400">*</span>
              </label>
              <input
                id="reward"
                name="reward"
                type="number"
                min="0"
                step="0.01"
                value={formData.reward}
                onChange={handleChange}
                placeholder="e.g. 0.5"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                This amount will be locked in the escrow contract until a tip is accepted.
              </p>
            </div>

            {/* Status Messages */}
            {successMsg && (
              <div className="flex items-start gap-2 bg-emerald-900/40 border border-emerald-700 text-emerald-300 rounded-lg px-4 py-3 text-sm">
                <span>✓</span>
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="flex items-start gap-2 bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
                <span>✗</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Submitting transaction…
                </>
              ) : (
                'Post Bounty'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
