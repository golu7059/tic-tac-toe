import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import isWinner from "../helpers/checkWinner";
import { FaRegSmile } from "react-icons/fa";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { FaGamepad } from "react-icons/fa";

// Helper function to check winner or tie.
// import google font cdn
import "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";

const checkGameEnd = (board, player) => {
  const win = isWinner(board, player);
  if (win) return player;
  if (board.every(cell => cell !== "")) return "No winner";
  return null;
};

function OfflinePlay() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true); // true => 'o', false => 'x'
  const [winner, setWinner] = useState(null);

  // Handle user's move
  function play(index) {
    if (board[index] !== "" || winner) return; // Prevent invalid moves
    const newBoard = [...board];
    newBoard[index] = turn ? "o" : "x";
    setBoard(newBoard);

    const result = checkGameEnd(newBoard, turn ? "o" : "x");
    if (result) {
      setWinner(result);
    } else {
      setTurn(!turn); // Switch turns
    }
  }

  // Reset the game
  function reset() {
    setBoard(Array(9).fill(""));
    setTurn(true);
    setWinner(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
        Play Tic-Tac-Toe Offline
      </h1>

      {/* Display winner message or turn */}
      {winner ? (
        <h2 className="text-3xl sm:text-4xl text-white mb-6 flex items-center">
          {winner === "No winner" ? (
            "It's a Tie!"
          ) : winner === "o" ? (
            <span className="flex items-center">
              You win! <FaRegSmile className="ml-2 text-green-500 text-3xl sm:text-4xl" />
            </span>
          ) : (
            <span className="flex items-center">
              You lose! <FaRegFaceSadCry className="ml-2 text-yellow-500 text-3xl sm:text-4xl" />
            </span>
          )}
        </h2>
      ) : (
        <h2 className="text-2xl sm:text-3xl text-white mb-4">
          Current Turn: <span className="font-bold text-orange-400">{turn ? "O" : "X"}</span>
        </h2>
      )}

      {/* Tic-Tac-Toe Grid */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
        {board.map((player, idx) => (
          <Card key={idx} gameEnd={!!winner} onPlay={() => play(idx)} player={player} index={idx} />
        ))}
      </div>

      {/* Reset Button */}
      <button
        className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600"
        onClick={reset}
      >
        Reset Game
      </button>

      {/* Back to Home Button */}
      <div className="mt-10">
        <Link to="/">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-6 rounded-full flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
            <FaGamepad className="text-lg" />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OfflinePlay;
