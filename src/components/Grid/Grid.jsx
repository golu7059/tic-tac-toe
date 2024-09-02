import Card from "../Card/Card";
import { useState } from "react";
import "./Grid.css";
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
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="winner-announcement">Winner is {winner}!</h1>
          <button className="reset" onClick={reset}>Reset Game</button>
        </>
      )}
      {!winner && <h1 className="turn-highlight">Current turn: {turn ? 'o' : 'x'}</h1>}
      <div className="grid">
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
    </div>
  );
}

export default Grid;
