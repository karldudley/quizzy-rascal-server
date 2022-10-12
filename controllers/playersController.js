const Player = require('../models/playerModel')
const mongoose = require('mongoose')

//get all players
const getPlayers = async (req, res) => {
    try {
        const players = await Player.find({  }).sort({createdAt: -1})
        res.status(200).json(players)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// get a players by category
const getPlayerById = async (req, res) => {
    try {
        // const player = await Player.findById(req.params.id)
        const players = await Player.find({category: req.params.id}).exec();
        
        res.status(200).json(players)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//create a new player
const createPlayer = async (req, res) => {
    const { name, highScore, category } = req.body;
    try {        
        const player = await Player.create({ name, highScore, category})
        res.status(201).json(player)    
    } catch (error) {
        res.status(422).json({error: error.message})
    }
}

//delete a player
const destroyPlayer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such player'})
    }
  
    const player = await Player.findOneAndDelete({_id: id})
  
    if(!player) {
      return res.status(400).json({error: 'No such player'})
    }
  
    res.status(200).json(player)
}

// update a player
const updatePlayer = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such player'})
    }

    const player = await Player.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!player) {
        return res.status(400).json({error: 'No such player!'})
    }
    
    res.status(200).json(player)
}

module.exports = {
    getPlayers, 
    getPlayerById, 
    createPlayer, 
    destroyPlayer,
    updatePlayer
};
