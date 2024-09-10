import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomPage() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (name && roomId) {
      navigate(`/game/${roomId}`, { state: { name } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-16">
      {/* Page Title */}
      <img 
      src="https://cdni.iconscout.com/illustration/premium/thumb/gamers-play-online-video-game-illustration-download-in-svg-png-gif-file-formats--blogger-logo-live-gaming-streaming-esport-gamer-pack-people-illustrations-4231654.png?f=webp" 
      alt="logo"  
      className='h-24 mb-10'/>
      <h1 className="text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Join a Room
      </h1>

      {/* Input Fields */}
      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <input
          className="w-full p-4 text-lg border-none rounded-lg focus:ring-4 focus:ring-purple-500 bg-white bg-opacity-80 placeholder-gray-500 text-gray-800 focus:outline-none"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-4 text-lg border-none rounded-lg focus:ring-4 focus:ring-blue-500 bg-white bg-opacity-80 placeholder-gray-500 text-gray-800 focus:outline-none"
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        {/* Join Button */}
        <button
          className={`w-full py-4 rounded-lg text-lg font-bold text-white transition-transform transform hover:scale-105 bg-blue-600 hover:bg-blue-700 shadow-lg ${
            name && roomId ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={handleJoinRoom}
          disabled={!name || !roomId}
        >
          Join Room
        </button>
      </div>

      {/* Footer Message */}
      <footer className="mt-12 text-gray-400 text-sm sm:text-base text-center opacity-80 hover:opacity-100 transition-opacity duration-300">
        <p>Enter your name and the room ID to start playing!</p>
        <p> Ready to play? 🎮</p>
      </footer>
    </div>
  );
}

export default RoomPage;
