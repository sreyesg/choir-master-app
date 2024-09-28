// =============== require packages =================== //
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')

// =============== require controllers =================== //
const authController = require('./controllers/auth.js')


// =============== Database Connection =================== //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

// =============== middleware =================== //
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    
}))



// =============== routes =================== //

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.use('/auth', authController)


// =============== app listener =================== //
app.listen(4000, (req, res) => {
    console.log('listening on port 4000')
})