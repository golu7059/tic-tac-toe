import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../firebase/firebaseConnection';
import { ref, set, onValue } from 'firebase/database'; // Correct imports from firebase

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
        setBoard(gameData.board);
        setIsXNext(gameData.isXNext);
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
    <button className="border w-16 h-16" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-4">Tic Tac Toe - Room: {roomId}</h1>
      <h2 className="text-lg mb-4">Player: {state?.name}</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, idx) => renderSquare(idx))}
      </div>
    </div>
  );
}

export default Game;
