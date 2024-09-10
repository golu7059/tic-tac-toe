import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import isWinner from "../helpers/checkWinner";
import { FaRegSmile } from "react-icons/fa";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { FaGamepad } from "react-icons/fa";

// Helper function to get a random available move for the computer
const getRandomEmptyCell = (board) => {
  const emptyCells = board
    .map((cell, idx) => (cell === "" ? idx : null))
    .filter((idx) => idx !== null);
  if (emptyCells.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

// Helper function to find a blocking move if the player is about to win
const findBlockingMove = (board) => {
  const newBoard = [...board];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      newBoard[i] = "o"; // Simulate the player's move
      if (isWinner(newBoard, "o")) {
        return i; // Return the index to block the player
      }
      newBoard[i] = ""; // Reset the board if it's not a winning move
    }
  }
  return null;
};

function Computer() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true); // true => user's turn, false => computer's turn
  const [winner, setWinner] = useState(null);

  // User's move
  function play(index) {
    if (board[index] !== "" || winner || !turn) return; // Prevent invalid move
    board[index] = "o"; // User plays 'o'
    const win = isWinner(board, "o");
    if (win) {
      setWinner(win);
    } else if (board.every((cell) => cell !== "")) {
      setWinner("No winner");
    } else {
      setBoard([...board]);
      setTurn(false); // Computer's turn
    }
  }

  // Computer's move, which automatically triggers after the user's move
  useEffect(() => {
    if (!turn && !winner) {
      let computerMove = findBlockingMove(board);
      if (computerMove === null) {
        computerMove = getRandomEmptyCell(board); // Fallback to random if no blocking move
      }
      if (computerMove !== null) {
        setTimeout(() => {
          board[computerMove] = "x"; // Computer plays 'x'
          const win = isWinner(board, "x");
          if (win) {
            setWinner(win);
          } else if (board.every((cell) => cell !== "")) {
            setWinner("No winner");
          } else {
            setBoard([...board]);
            setTurn(true); // User's turn again
          }
        }, 500); // Delay to simulate thinking time for the computer
      }
    }
  }, [turn, board, winner]);

  function reset() {
    setTurn(true); // User starts first
    setWinner(null);
    setBoard(Array(9).fill(""));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 p-16">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
        Play vs Computer
      </h1>

      {/* Winner Announcement */}
      {winner && (
        <h1 className="winner-announcement text-3xl sm:text-4xl text-white mb-6 animate-bounce">
          {winner === "No winner" ? (
            "It's a Tie!"
          ) : winner === "x" ? (
            <span className="flex items-center">
              You lose!
              <FaRegFaceSadCry className="ml-2 text-yellow-500 text-3xl sm:text-4xl" />
            </span>
          ) : (
            <span className="flex items-center">
              You win!
              <FaRegSmile className="ml-2 text-green-500 text-3xl sm:text-4xl" />
            </span>
          )}
        </h1>
      )}

      {/* Turn Announcement */}
      {!winner && (
        <h1 className="turn-highlight text-2xl sm:text-3xl text-white mb-4">
          {turn ? "Your turn (o)" : "Computer's turn (x)"}
        </h1>
      )}

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-lg p-5">
        {board.map((el, idx) => (
          <Card
            gameEnd={!!winner}
            key={idx}
            onPlay={play}
            player={el}
            index={idx}
          />
        ))}
      </div>

      {/* Reset Button */}
      <button
        className="reset bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 mt-6 px-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        onClick={reset}
      >
        Reset Game
      </button>

       {/* Back Button */}
       <div className="mt-10">
        <Link to="/">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full flex items-center space-x-2 transition-transform duration-300 transform hover:scale-105">
            <FaGamepad className="text-lg" />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Computer;
