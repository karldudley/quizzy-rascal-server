const server = require('./server');
const mongoose = require('mongoose')
const port = process.env.PORT || 8080;
require('dotenv').config()

//connection to mongo and start to listen
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`Connected to DB and Socket Server now departing from port ${port}!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })


// No MongoDB connection yet
// server.listen(port, () => {
//   console.log(`Socket server is up on port ${port}.`);
// });
