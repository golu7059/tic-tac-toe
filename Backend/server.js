const express = require('express');
const cors = require('cors'); // added CORS middleware
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(cors()); // allow all origins
app.use(express.json());

// Global rooms dictionary
const rooms = {};

// Create room endpoint (stores host's player id, name and an initial board)
app.get('/createRoom', (req, res) => {
  const playerName = req.query.name || "Host";
  const playerId = Date.now() + "-" + Math.floor(Math.random() * 1000);

  // Generate room id
  const date = new Date();
  const code = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${Math.floor(Math.random() * 1000)}`;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedCode = '';
  for (let i = 0; i < 4; i++) {
    generatedCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  const roomId = `${code}-${generatedCode}`;

  // Create room and include an initial empty board
  rooms[roomId] = { 
    players: [{ id: playerId, name: playerName }],
    board: Array(9).fill(null)
  };
  console.log("Room Created:", roomId, rooms[roomId]);
  res.json({ roomId, playerId, playerName });
});

// Join room endpoint (allows a second player to join, up to 2 players)
app.get('/joinRoom', (req, res) => {
  const roomId = req.query.roomId;
  const playerName = req.query.name || "Player";
  if (!rooms[roomId]) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (rooms[roomId].players.length >= 2) {
    return res.status(400).json({ error: "Room is full" });
  }
  const playerId = Date.now() + "-" + Math.floor(Math.random() * 1000);
  rooms[roomId].players.push({ id: playerId, name: playerName });
  console.log("Player Joined:", roomId, rooms[roomId]);
  res.json({ roomId, playerId, playerName });
});

// Updated getRoom endpoint returns players and board state
app.get('/getRoom', (req, res) => {
  const roomId = req.query.roomId;
  const room = rooms[roomId];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json({ 
    players: room.players,
    board: room.board
  });
});

// ...existing express middleware/routes if any...

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "join") {
        // Associate the connection with the room id
        ws.roomId = data.roomId;
      } else if (data.type === "move") {
        // Update server-side room state with the new board state
        if (rooms[data.roomId]) {
          rooms[data.roomId].board = data.board;
        }
        // Broadcast move message to all clients in the same room (including sender)
        wss.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client.roomId === data.roomId
          ) {
            client.send(message);
          }
        });
      } else if (data.type === "win") {
        // Update room state to record the winner
        if (rooms[data.roomId]) {
          rooms[data.roomId].winner = data.winner;
        }
        // Broadcast win event to all clients in the same room so clients can stop game and display winner
        wss.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client.roomId === data.roomId
          ) {
            client.send(message);
          }
        });
      } else if (data.type === "reset") {
        // Broadcast the reset event similarly
        wss.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client.roomId === data.roomId
          ) {
            client.send(message);
          }
        });
      }
    } catch (err) {
      console.error("Error processing message", err);
    }
  });

  ws.on('close', () => {
    // ...existing code...
  });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
