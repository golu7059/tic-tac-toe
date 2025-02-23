import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import getSocket from '../helpers/serverWsClient';
import isWinner from '../helpers/checkWinner.js';
import RoomWaiting from './RoomWaiting.jsx';

function Game() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const localPlayerId = state?.playerId; 
  const [players, setPlayers] = useState((state && state.players) || []);
  const [gameReady, setGameReady] = useState(players.length === 2);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState("");

  let localSymbol = "";
  if (players.length >= 2) {
    localSymbol = players[0].id === localPlayerId ? 'X' : 'O';
  }

  // Listen to socket messages for opponent moves and win events
  useEffect(() => {
    const ws = getSocket();
    ws.onmessage = (event) => {
      const processData = (data) => {
        if (data.roomId !== roomId) return;
        if (data.type === "move") {
          setBoard(data.board);
          setIsXNext(data.isXNext);
        } else if (data.type === "win") {
          setWinner(data.winner);
        }
      };
      if (event.data instanceof Blob) {
        event.data.text().then((text) => {
          try {
            const data = JSON.parse(text);
            processData(data);
          } catch (err) {
            console.error("Error processing socket message", err);
          }
        });
      } else {
        try {
          const data = JSON.parse(event.data);
          processData(data);
        } catch (err) {
          console.error("Error processing socket message", err);
        }
      }
    };
  }, [roomId]);

  // Send join message when game is ready.
  useEffect(() => {
    if (gameReady) {
      getSocket().send(JSON.stringify({ type: "join", roomId }));
    }
  }, [gameReady, roomId]);

  // Poll room status until two players are present.
  useEffect(() => {
    if (!gameReady) {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:8080/getRoom?roomId=${roomId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.players && data.players.length === 2) {
              setPlayers(data.players);
              setGameReady(true);
              clearInterval(interval);
            }
          }
        } catch (error) {
          console.error("Error fetching room status", error);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [roomId, gameReady]);

  if (!gameReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900">
        {/* <h1 className="text-2xl text-white">Waiting for another player to join...</h1> */}
        <RoomWaiting roomId={roomId} />
      </div>
    );
  }

  // Handle a move: if the move is valid, update the board and check for a winner.
  const handleClick = (index) => {
    if (winner) return; // No further moves if game ended.
    const expectedSymbol = isXNext ? 'X' : 'O';
    if (localSymbol !== expectedSymbol) return; // Not your turn.
    if (board[index] !== null) return; // Cell filled.
    const newBoard = board.slice();
    newBoard[index] = expectedSymbol;
    const newTurn = !isXNext;
    setBoard(newBoard);
    setIsXNext(newTurn);

    // Send move message
    const message = JSON.stringify({
      type: "move",
      roomId,
      board: newBoard,
      isXNext: newTurn
    });
    const ws = getSocket();
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error("Cannot send message, socket state:", ws.readyState);
      getSocket();
    }

    // Check for a winner
    const potentialWin = isWinner(newBoard, expectedSymbol);
    if (potentialWin) {
      setWinner(potentialWin);
      // Broadcast win message
      getSocket().send(JSON.stringify({
        type: "win",
        roomId,
        winner: potentialWin
      }));
    } else {
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
    <div className="grid-wrapper bg-gradient-to-br from-blue-900 via-black to-blue-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Game Started! Room: {roomId}</h1>
      <p className="mb-4 text-white">Players: {players.map(p => p.name).join(", ")}</p>
      {winner ? (
        <h2 className="turn-highlight text-xl sm:text-2xl text-white mb-4">
          Winner: {winner}
        </h2>
      ) : (
        <h2 className="turn-highlight text-xl sm:text-2xl text-white mb-4">
          {localSymbol === (isXNext ? 'X' : 'O') ? "Your turn" : "Opponent's turn"} ({isXNext ? "X" : "O"})
        </h2>
      )}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        {board.map((_, idx) => renderSquare(idx))}
      </div>
    </div>
  );
}

export default Game;
