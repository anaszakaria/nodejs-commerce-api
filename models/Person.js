const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    job: {
        type: String,
        required: true
    }
},
{
    collection: 'person'
})

module.exports = mongoose.model('Person', PersonSchema)
