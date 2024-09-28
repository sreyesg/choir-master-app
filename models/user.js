const mongoose = require('mongoose')

const repertoireSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['entrance','offertory','communion','exit']
    },
    songBook: {
        type: String
    },
    page: {
        type: String
    }
})

const userSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: {type: String, required: true},
    email: {type: String},
    choir: {type: String},
    repertoire: [repertoireSchema] 
})

const User = mongoose.model ('User', userSchema)

module.exports = User

