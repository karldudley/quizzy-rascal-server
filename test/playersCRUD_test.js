//import the Player model
const Player = require('../models/playerModel');
const assert = require('assert');
  
let player;
// this will run before running every test
beforeEach(() => {
    // Creating a new Instance of Player Model
    player = new Player({ name: 'karl', highScore: 10 });
    player.save()
        .then(() => done());
});

describe('Creating a player in MongoDB', () => {
    it('Creates a New player', (done) => {
        const newPlayer = new Player({ name: 'karl', highScore: 10 });
        newPlayer.save() // returns a promise after some time
            .then(() => {
                //if the newPlayer is saved in db and it is not new
                assert(!newPlayer.isNew);
                done();
            });
    });
});
  
describe('Reading Details of Player', () => {
    it('Finds player with the name', (done) => {
        Player.findOne({ name: 'karl' })
            .then((player) => {
                assert(player.name === 'karl');
                done();
            });
    })
})

describe('Updating a player', () => { 
    it('Sets and saves a player using an instance', (done) => {
        player.set('name', 'kev')
        done();
    });
});

describe('Deleting a player', () => {
    
    it('removes a player using its instance', (done) => {
    player.remove({ name: 'karl' })
        .then(() => Player.findOne({ name: 'karl' }))
        .then((player) => {
            assert(player == null);
            done();
        });
    });

    it('removes multiple players', (done) => {
        player.remove({ name: 'karl' })
      .then(() => Player.findOne({ name: 'karl' }))
      .then((player) => {
        assert(player === null);
        done();
      });
    });

    it('finds and removes a player', (done) => {
    Player.findOneAndRemove({ name: 'karl' })
      .then(() => Player.findOne({ name: 'karl' }))
      .then((player) => {
        assert(player === null);
        done();
      });
    });
});


