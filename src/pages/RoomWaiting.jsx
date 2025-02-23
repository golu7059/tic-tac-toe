import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RoomWaiting() {
  const { state } = useLocation();
  const { roomId, playerId, playerName } = state || {};
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8080/getRoom?roomId=${roomId}`);
        if (res.ok) {
          const data = await res.json();
          setPlayers(data.players);
          if (data.players && data.players.length === 2) {
            clearInterval(interval);
            navigate(`/game/${roomId}`, { state: { roomId, playerId, playerName, players: data.players } });
          }
        }
      } catch (error) {
        console.error("Error fetching room status", error);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [roomId, navigate, playerId, playerName]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => alert("Room ID copied to clipboard!"))
      .catch(err => console.error("Failed to copy room id:", err));
  };

  return (
    <div className="grid-wrapper bg-gradient-to-br from-blue-900 via-black to-blue-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Room: {roomId}</h1>
      <button
        onClick={copyRoomId}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Copy Room ID
      </button>
      <p className="mb-4 text-xl text-white">Waiting for another player to join...</p>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-xl font-semibold text-white mb-2">Players:</h2>
        {players.map((player, idx) => (
          <p key={idx} className="text-lg text-white">{player.name}</p>
        ))}
      </div>
    </div>
  );
}

export default RoomWaiting;
