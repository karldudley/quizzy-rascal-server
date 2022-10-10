import { Express } from "express";
import axios from "axios";

async function getQuestionData() {
    try{
        const response = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
        const data = response.data.results
        for(let i = 0; i < 10; i++) {
         {
                const roundData = [data[i].question, data[i].incorrect_answers[0],data[i].incorrect_answers[1],data[i].incorrect_answers[2], data[i].correct_answer]
                console.log(roundData)
            }
                // Need to add timer 
        }
    }
    catch (error) {
        console.log(error)
    }
}

getQuestionData()
