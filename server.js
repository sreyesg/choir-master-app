// =============== require packages =================== //
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const path = require('path')

// =============== require controllers =================== //
const authController = require('./controllers/auth.js')
const repertoireController = require('./controllers/repertoire.js')
const passUserToView = require('./middleware/pass-user-to-view.js')
const isSignedIn = require('./middleware/is-signed-in.js')
const port = process.env.PORT ? process.env.PORT : '3010';

// =============== Database Connection =================== //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

// =============== middleware =================== //
// app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    
}))


// =============== routes =================== //
app.use(passUserToView)
app.get('/', (req, res) => {
    if(req.session.user){
        res.redirect(`/users/${req.session.user._id}/repertoire`)
    }else {
        res.render('index.ejs')
    }
})
app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users/:userId/repertoire', repertoireController)


// =============== app listener =================== //
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`)
})