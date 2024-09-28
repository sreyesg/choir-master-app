const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// ======== render sign-up form =========// 
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})
// ========= Create User ============== //
router.post('/sign-up',async (req, res) => {
    console.log(req.body)
    const userInDatabase = await User.findOne({username: req.body.username})
    if (userInDatabase){
        return res.send('User already exits, please try a different one')
    }  
    if(req.body.password !== req.body.confirmPassword){
        return res.send('password does not match')
    }
    const hashedPassowrd = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassowrd
    await User.create(req.body)
        return res.send('new user created')
})












module.exports = router