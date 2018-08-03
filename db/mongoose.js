//Import the mongoose module
const mongoose = require('mongoose')

//Set up default mongoose connection
const mongoDB = 'mongodb://anas:anas1234@localhost:27017/vue_app'
mongoose.connect(mongoDB)

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise

//Get the default connection
const db = mongoose.connection

db.on('connected', () => {
    console.log('Connected to MongoDB')
})

db.on('disconnected', () => {
    console.log('MongoDB Disconnected')
})

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
