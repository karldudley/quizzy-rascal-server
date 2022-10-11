const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  highScore: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Player', playerSchema)
