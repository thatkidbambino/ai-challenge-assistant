import React, { useState } from 'react';
import Navbar from './components/Navbar';
import GameSelector from './components/GameSelector';
import ChallengeCard from './components/ChallengeCard';

export default function App() {
  const [selectedGame, setSelectedGame] = useState('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-8">
      <Navbar />
      <GameSelector
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        setChallenge={setChallenge}
        setLoading={setLoading}
      />
      {loading && <div className="mt-4 animate-pulse text-purple-400">Generating Challenge...</div>}
      {challenge && !loading && <ChallengeCard challenge={challenge} />}
    </div>
  );
}