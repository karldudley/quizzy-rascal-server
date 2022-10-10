const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const socketio = require('socket.io');

// MIDDLEWARE
app.use(cors())
app.use(express.json());

// SERVER ROUTES
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
  console.log(`A new player just connected on ${socket.id}`);

  socket.on('join', (data) => {
    socket.join(data)
  })

  socket.on('sendMessage', (data, callback) => {
    socket.to(data.room).emit("receiveMessage", data)
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });
});

module.exports = server;
