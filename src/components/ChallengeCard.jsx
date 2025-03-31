import { useState } from 'react';

export default function ChallengeCard({ challenge }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(challenge);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-3xl text-left border border-purple-500">
      <h2 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">🔥 Challenge:</h2>
      <p className="mb-4 text-gray-200 whitespace-pre-wrap leading-relaxed">{challenge}</p>
      <button
        onClick={copyToClipboard}
        className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white shadow-md"
      >
        {copied ? 'Copied!' : 'Copy Challenge'}
      </button>
    </div>
  );
}