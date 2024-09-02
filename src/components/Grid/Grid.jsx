import Card from "../Card/Card";
import { useState, useEffect } from "react";
import isWinner from "../../helpers/checkWinner";

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [turn, setTurn] = useState(true); // true => o ? x
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
        <>
          <h1 className="winner-announcement text-3xl text-white mb-6 animate-bounce">
            {winner === "No winner" ? "No winner!" : `Winner is ${winner}!`}
          </h1>
        </>
      )}
      {!winner && (
        <h1 className="turn-highlight text-2xl text-white mb-4">
          Current turn: <span className="font-bold">{turn ? 'o' : 'x'}</span>
        </h1>
      )}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg p-5">
        {board.map((el, idx) => (
          <Card
            gameEnd={winner ? true : false}
            key={idx}
            onPlay={play}
            player={el}
            index={idx}
          />
        ))}
      </div>
      <>
          <button className="reset bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 mt-6 px-4 rounded shadow-lg transition duration-300 transform hover:scale-105" onClick={reset}>
            Reset Game
          </button>
        </>
    </div>
  );
}

export default Grid;
