import axios from 'axios';

export default function GameSelector({ selectedGame, setSelectedGame, setChallenge, setLoading }) {
  const generateChallenge = async () => {
    if (!selectedGame) return alert('Select a game first!');
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/generate`, {
        game: selectedGame,
      });
      setChallenge(response.data.challenge);
    } catch (error) {
      console.error('Error generating challenge:', error);
      alert('API Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 items-center mb-6">
      <select
        className="bg-gray-800 text-white p-2 rounded border border-gray-700"
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">Select Game</option>
        <option value="Elden Ring">Elden Ring</option>
        <option value="Fortnite">Fortnite</option>
        <option value="Dark Souls">Dark Souls</option>
      </select>
      <button
        onClick={generateChallenge}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded shadow-md hover:scale-105 transition-transform"
      >
        Generate Challenge
      </button>
    </div>
  );
}
