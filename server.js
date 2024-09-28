// =============== require packages =================== //
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')

// =============== require controllers =================== //



// =============== Database Connection =================== //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

// =============== middleware =================== //







// =============== routes =================== //

app.get('/', (req, res) => {
    res.send('Welcome to home')
})



// =============== app listener =================== //
app.listen(4000, (req, res) => {
    console.log('listening on port 4000')
})