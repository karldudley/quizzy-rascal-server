const axios = require('axios')

async function getQuestionData() {

    var roundData = []

    try{
        const response = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
        const data = response.data.results
        // for(let i = 0; i < 10; i++) {
         
        //         roundData.push([data[i].question, data[i].incorrect_answers[0],data[i].incorrect_answers[1],data[i].incorrect_answers[2], data[i].correct_answer])                
        // }
        // return (roundData)
        return(data)

    }
    catch (error) {
        console.log(error)
    }
}


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
            active: false,
            questionData: getQuestionData()
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
