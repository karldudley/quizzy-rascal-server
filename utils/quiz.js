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

        (game) ? game.players.push(player) : console.log('Room not found');

        return player;
    }

    getPlayerData (roomName) {
        let game = this.games.find( y => y.roomName == roomName);

        if(game === undefined ){
            return "error"
        }
        return game.players;
    }

    getHost (roomName) {
        let game = this.games.find( y => y.roomName == roomName);

        if(game === undefined ){
            return "error"
        }
        return game.hostName;
    }
}

module.exports = Quiz;
