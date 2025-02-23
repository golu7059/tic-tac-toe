import { useNavigate } from "react-router-dom";
import { useState } from "react";

function OnlineOptions() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");

  async function handleCreateRoom() {
    if (!playerName) return;
    try {
      const res = await fetch(`http://localhost:8080/createRoom?name=${playerName}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.roomId) {
        // Redirect directly to the game page after room creation
        navigate(`/game/${data.roomId}`, {
          state: { roomId: data.roomId, playerId: data.playerId, playerName: data.playerName },
        });
      }
    } catch (error) {
      console.error("Error creating room", error);
    }
  }

  function handleJoinRoom() {
    navigate("/room");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-8">
      {/* ...existing layout... */}
      <h1 className="text-5xl font-bold text-white mb-10">Online Options</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="mb-4 p-2 rounded"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <div className="space-y-6">
        <button
          onClick={handleCreateRoom}
          className="w-full py-4 rounded-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Create Room
        </button>
        <button
          onClick={handleJoinRoom}
          className="w-full py-4 rounded-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Join Room
        </button>
      </div>
      {/* ...existing layout... */}
    </div>
  );
}

export default OnlineOptions;
