import { Express } from "express";
import axios from "axios";

async function getQuestionData() {
    try{
        const response = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
        const data = reponse.results
        data.forEach(question => {
            setTimeout(question = [data.question, data.incorrect_answers[0],data.incorrect_answers[1],data.incorrect_answers[2], data.correct_answer], 15000)
        })
 // Give all data a referencable unique value to enable ability to randomise how we display
    }
    catch (error) {
        console.log(error)
    }
}

