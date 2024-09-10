import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../firebase/firebaseConnection';
import { ref, set, onValue } from 'firebase/database';

function Game() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Sync game state from Firebase
  useEffect(() => {
    const gameRef = ref(db, `rooms/${roomId}`);
    onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      if (gameData) {
        setBoard(Array.isArray(gameData.board) ? gameData.board : Array(9).fill(null));
        setIsXNext(gameData.isXNext ?? true);
      }
    });
  }, [roomId]);

  // Handle a move
  const handleClick = (index) => {
    if (!board[index]) {
      const newBoard = board.slice();
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);

      // Update the game state in Firebase
      set(ref(db, `rooms/${roomId}`), {
        board: newBoard,
        isXNext: !isXNext,
      });
    }
  };

  const renderSquare = (index) => (
    <button
      key={index}
      className="w-16 h-16 text-3xl font-bold text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-black to-blue-800 p-6">
      {/* <h1 className="text-3xl font-bold text-white mb-4">Tic Tac Toe - Room: {roomId}</h1>
      <h2 className="text-xl text-gray-300 mb-6">Player: {state?.name}</h2>
      <div className="grid grid-cols-3 gap-2 max-w-xs w-full">
        {board.map((_, idx) => renderSquare(idx))}
      </div> */}
      <p className='font-mono text-3xl font-bold text-orange-700'>Available soon ! Working on it ..... </p>
    </div>
  );
}

export default Game;
