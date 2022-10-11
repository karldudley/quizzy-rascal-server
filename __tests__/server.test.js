const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("my awesome project", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    afterEach(() => {
        io.close();
        clientSocket.close();
    });

    describe('basic socket.io example', () => {
        test("should work", (done) => {
            clientSocket.on("hello", (arg) => {
                expect(arg).toBe("world");
                done();
            });
            serverSocket.emit("hello", "world");
        });

        test('assign id function', (done) => {
            serverSocket.emit('assign-id', { id: clientSocket.id })
            setTimeout(() => {
                clientSocket.on('assign-id', (arg) => {
                    expect(arg).toBe({ id: clientSocket.id });
                    done();
                })
                done();
            }, 10);
        })
    })

    describe('creating rooms', () => {
        test('argument can be sent and recieved', (done) => {
            const roomName = 'room1'
            const playerName = 'player1'
            clientSocket.emit('create', ({ roomName, playerName }) => {
                socket.join(roomName)
            })
            setTimeout(() => {
                serverSocket.on('create', (arg) => {
                    expect(arg).toBe({ roomName, playerName });
                    done();
                })
                done();
            }, 10)
        })

        test('socket joins the room', (done) => {
            const roomName = 'room2'
            const playerName = 'player2'
            clientSocket.emit('create', ({ roomName, playerName }) => {
                socket.join(roomName)
            })
            setTimeout(() => {
                serverSocket.on('create', () => {
                    expect(io.engine.clientsCount).toBe(1);
                    done();
                })
                done();
            }, 50)
        })
        describe('joining rooms', () => {
            xtest('joining a game', (done) => {
                const roomName = 'room1'
                const playerName1 = 'player1'
                clientSocket.emit('create', ({ roomName, playerName1 }) => {
                    socket.join(roomName)
                })
                clientSocket.emit('join', roomName) //need to find a way to use 2 client sockets at once
                expect(io.engine.clientsCount).toBe(2)
            })
        })
        describe('starting a game', () => {
            test('socket can send the begin signal', (done) => {
                clientSocket.emit('startGame', {roomName: 'room1'})
                serverSocket.on("startGame", (roomName) => {
                    io.in(roomName).emit('begin', 'function that will start the game');
                })
                    setTimeout(() => {
                        clientSocket.on('begin', (arg) => {
                            expect(arg).toBe('function that will start the game');
                            done();
                        })
                        done();
                    },10)
        })
    })

})
})
