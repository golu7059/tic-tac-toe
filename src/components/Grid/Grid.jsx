import Card from "../Card/Card";
import { useState } from "react";
import isWinner from "../../helpers/checkWinner";

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [turn, setTurn] = useState(true); // true => o, false => x
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (board[index] !== "" || winner) return; // Prevent click on already filled cell or after game ends
    board[index] = turn ? 'o' : 'x';
    const win = isWinner(board, turn ? 'o' : 'x');
    if (win) {
      setWinner(win);
    } else if (board.every(cell => cell !== "")) {
      // Check if all cells are filled and no winner
      setWinner("No winner");
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(""));
  }

  return (
    <div className="grid-wrapper bg-gradient-to-br from-blue-900 via-black to-blue-900 min-h-screen flex flex-col items-center justify-center p-4">
      {winner && (
        <h1 className="winner-announcement text-3xl sm:text-4xl text-white mb-6 animate-bounce">
          {winner === "No winner" ? "It's a Tie!" : `Winner is ${winner}!`}
        </h1>
      )}
      {!winner && (
        <h1 className="turn-highlight text-xl sm:text-2xl text-white mb-4">
          Current turn: <span className="font-bold">{turn ? 'O' : 'X'}</span>
        </h1>
      )}

      {/* Grid container */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
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
        className="reset bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 mt-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        onClick={reset}
      >
        Reset Game
      </button>
    </div>
  );
}

export default Grid;
