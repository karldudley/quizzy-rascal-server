const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const socketio = require('socket.io');
const axios = require('axios');

const Quiz = require('./utils/quiz') 

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

const quiz = new Quiz();

io.on('connection', socket => {

  console.log(`A new player just connected on ${socket.id}`);

  //give a socket id to connection
  socket.emit('assign-id', { id: socket.id});

  socket.on("create", ({roomName, playerName }, callback) => {
    //create room
    socket.join(roomName)

    //create a new game for the room
    quiz.addGame(playerName, roomName, "hard", "8", "9")

    //add new player
    quiz.addPlayer(playerName, roomName)

    //send callback message to client
    callback({code: "success",
              message: `SUCCESS: Created a new game, hosted by ${playerName}`
    });
  })

  socket.on("join", ({roomName, playerName }, callback) => {
    //join room
    socket.join(roomName)

    //add new player
    quiz.addPlayer(playerName, roomName)

    //send callback message to client
    callback({code: "success",
              message: `SUCCESS: Added new player to game`
    });
  })

  socket.on("lobby", (roomName) => {
    //send player data to lobby for those in the room only
    const players = quiz.getPlayerData(roomName)
    const host = quiz.getHost(roomName)
    io.in(roomName).emit('playerData', players, host);
  });

  socket.on("getQuestions", async (roomName) => {
    // send player data to lobby for those in the room only
    // const response = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
    console.log(quiz.getQuestions(roomName))
    data = await quiz.getQuestions(roomName)
    const host = quiz.getHost(roomName)
    
    io.in(roomName).emit('questions', data, host);
  });

  socket.on("startGame", (roomName) => {
    //send signal to start the game to everyone in the room
    io.in(roomName).emit('begin');
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });
});

module.exports = server;
