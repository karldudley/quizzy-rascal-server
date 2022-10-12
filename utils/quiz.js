const axios = require('axios')
var he = require('he');

async function getQuestionData(difficulty, type, subject) {

    try{
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${subject}&difficulty=${difficulty}&type=${type}`)
        const questionsData = response.data.results

        // Re-factor question data object to make it easier to render. And decode using he dependency
        const questions = []
        questionsData.map((data) => {
            let questionText = he.decode(data.question)
            let correctPair = {
                answerText: he.decode(data.correct_answer),
                isCorrect: true
            }
            let choicesArray = [correctPair]

            const wrong = data.incorrect_answers 
            wrong.forEach((item) => {
                let wrongPair = {
                    answerText: he.decode(item),
                    isCorrect: false
                }
                choicesArray.push(wrongPair)
            })
            let shuffledAnswers = choicesArray.sort(function() {
                return Math.random() - 0.5;
            })
            let answerOptions = shuffledAnswers
            let newObject = {
                questionText,
                answerOptions
            }
            questions.push(newObject)
        })
        
        return(questions)
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

    addGame (hostName, roomName, difficulty, type, subject) {
        let game = {
            hostName,
            roomName,
            difficulty,
            type,
            subject,
            players: [],
            active: false,
            questionData: getQuestionData(difficulty, type, subject)
        }

        this.games.push(game);

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

    // updatePlayer(score, roomName, playerName) {
    //     let player = this.players.find( y => y.playerName == playerName);
    // }

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
    getQuestions (roomName) {
        let game = this.games.find( y => y.roomName == roomName);

        if(game === undefined ){
            return "error"
        }
        return game.questionData;
    }
}

module.exports = Quiz;
