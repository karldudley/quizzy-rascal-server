const express = require('express');
const router = express.Router();
const {
    getPlayers,
    getPlayerById,
    createPlayer,
    destroyPlayer,
    updatePlayer
} = require('../controllers/playersController')

// GET all players
router.get('/', getPlayers)

// GET player by id
router.get('/:id', getPlayerById)

// POST new player
router.post('/', createPlayer)

// DELETE player
router.delete('/:id', destroyPlayer)

// UPDATE a player
router.patch('/:id', updatePlayer)

module.exports = router;
