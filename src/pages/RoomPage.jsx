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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <input
        className="border p-2 m-2"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="text"
        placeholder="Enter room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 m-2"
        onClick={handleJoinRoom}
      >
        Join Room
      </button>
    </div>
  );
}

export default RoomPage;
