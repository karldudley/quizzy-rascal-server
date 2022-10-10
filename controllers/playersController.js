const Player = require('../models/playerModel')
const mongoose = require('mongoose')

//get all players
const getPlayers = async (req, res) => {
    // try {
    //     const players = await Player.find({  }).sort({createdAt: -1})
    //     res.status(200).json(players)
    // } catch (error) {
    //     res.status(404).json({error: error.message})
    // }

    res.send("get all players")
}

// get a player by id
const getPlayerById = async (req, res) => {
    // try {
    //     const player = await Player.findById(req.params.id)
    //     res.status(200).json(player)
    // } catch (error) {
    //     res.status(404).json({error: error.message})
    // }
    res.send("get players by id")
}

//create a new player
const createPlayer = async (req, res) => {
    // const { newPlayer } = req.body;
    // try {
    //     // pre-populated values
    //     const name = newPlayer;
    //     highScore = 0;
        
    //     const player = await Player.create({ name, highScore})
    //     res.status(201).json(player)
    // } catch (error) {
    //     res.status(422).json({error: error.message})
    // }
    res.send("create new player")
}

//delete a player
const destroyPlayer = async (req, res) => {
    // const { id } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({error: 'No such player'})
    // }
  
    // const player = await Player.findOneAndDelete({_id: id})
  
    // if(!player) {
    //   return res.status(400).json({error: 'No such player'})
    // }
  
    // res.status(200).json(player)
    res.send("delete a player")
}

// update a player
const updatePlayer = async (req, res) => {
    // const { id } = req.params
  
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({error: 'No such player'})
    // }

    // const player = await Player.findOneAndUpdate({_id: id}, {
    //     ...req.body
    // })

    // if (!player) {
    //     return res.status(400).json({error: 'No such player!'})
    // }
    
    // res.status(200).json(player)
    res.send("update a player")
    
}

module.exports = {
    getPlayers, 
    getPlayerById, 
    createPlayer, 
    destroyPlayer,
    updatePlayer
};
