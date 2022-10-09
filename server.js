const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const formatMessage = require('./utils/formatMessage.js');

const {
  addPlayer,
  getAllPlayers,
  getPlayer,
  removePlayer,
} = require('./utils/players.js');

const { getGameStatus, setGame, setGameStatus } = require('./utils/game.js');

// SERVER ROUTES
const app = express();
const playersRoutes = require('./routes/players');
app.use('/players', playersRoutes);

app.get('/', (req, res) => {
  res.send("<h1 style=\"color:#D81159;\">Welcome to the Quizzy Rascal socket server</h1><h2>The following endpoints currently exist:</h2><h3>GET /players</h3><h3>GET /players/:id</h3><h3>POST /players/</h3><h3>DELETE /players/:id</h3><h3>PATCH /players/:id</h3>")
});

// SOCKETS.io CODE
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
      origin: "*",
  }
});

io.on('connection', socket => {
  console.log('A new player just connected');

  socket.on('join', ({ playerName, room }, callback) => {
    const { error, newPlayer } = addPlayer({ id: socket.id, playerName, room });

    if (error) return callback(error.message);
    callback();

    socket.join(newPlayer.room);

    socket.emit('message', formatMessage('Admin', 'Welcome!'));

    socket.broadcast
      .to(newPlayer.room)
      .emit(
        'message',
        formatMessage('Admin', `${newPlayer.playerName} has joined the game!`)
      );

    io.in(newPlayer.room).emit('room', {
      room: newPlayer.room,
      players: getAllPlayers(newPlayer.room),
    });
  });

  socket.on('sendMessage', (message, callback) => {
    const { error, player } = getPlayer(socket.id);

    if (error) return callback(error.message);

    if (player) {
      io.to(player.room).emit(
        'message',
        formatMessage(player.playerName, message)
      );
      callback();
    }
  });

  socket.on('getQuestion', async (data, callback) => {
    const { error, player } = getPlayer(socket.id);

    if (error) return callback(error.message);

    if (player) {
      const game = await setGame();

      io.to(player.room).emit('question', {
        playerName: player.playerName,
        ...game.prompt,
      });
    }
  });

  socket.on('sendAnswer', (answer, callback) => {
    const { error, player } = getPlayer(socket.id);

    if (error) return callback(error.message);

    if (player) {
      const { isRoundOver } = setGameStatus({
        event: 'sendAnswer',
        playerId: player.id,
        room: player.room,
      });

      io.to(player.room).emit('answer', {
        ...formatMessage(player.playerName, answer),
        isRoundOver,
      });

      callback();
    }
  });

  socket.on('getAnswer', (data, callback) => {
    const { error, player } = getPlayer(socket.id);

    if (error) return callback(error.message);

    if (player) {
      const { correctAnswer } = getGameStatus({
        event: 'getAnswer',
      });
      io.to(player.room).emit(
        'correctAnswer',
        formatMessage(player.playerName, correctAnswer)
      );
    }
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected.');

    const disconnectedPlayer = removePlayer(socket.id);

    if (disconnectedPlayer) {
      const { playerName, room } = disconnectedPlayer;
      io.in(room).emit(
        'message',
        formatMessage('Admin', `${playerName} has left!`)
      );

      io.in(room).emit('room', {
        room,
        players: getAllPlayers(room),
      });
    }
  });
});

module.exports = server;
