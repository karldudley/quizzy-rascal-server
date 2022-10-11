const mongoose = require('mongoose');
require('dotenv').config()

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI_TEST);

mongoose.connection
	.once('open', () => console.log('Creating Player'))
	.on('error', (error) => {
		console.warn('Error : ', error);
	});
	
	// runs before each test
	beforeEach((done) => {
		mongoose.connection.collections.players.drop(() => {
		done();
	    });
    });
