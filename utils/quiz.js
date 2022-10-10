class Quiz {
    constructor() {

        this.games = []; 
        this.players = [];
    }

    addGame (hostName, roomName, difficulty, count, subject) {
        let game = {
            hostName,
            roomName,
            difficulty,
            count,
            subject,
            players: [],
            active: false
        }

        this.games.push(game);
        // this.games.forEach(room => console.log(room))
        return game;
    }

    addPlayer(playerName, roomName) {
        let player = {
            playerName, 
            roomName, 
            score: 0
        }

        this.players.push(player);

        let game = this.games.find( y => y.roomName == roomName);
        // console.log(game)
        game.players.push(player);

        return player;
    }
}

module.exports = Quiz;
