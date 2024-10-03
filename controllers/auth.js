const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// ======== render forms =========// 
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})

router.get('/sign-out',(req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// ================= Create user ============== //
router.post('/sign-up',async (req, res) => {
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
    return res.render('auth/sign-in.ejs')
})



// ================ sign-in user =============== //
router.post('/sign-in', async(req, res) => {
    const userInDatabase = await User.findOne({username: req.body.username})
    
    if(!userInDatabase){
        return res.send('Login failed, try it again')
    }
    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
    if(!validPassword){
        return res.send('Login failed, try it again')
    }
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id,
    }
    
    res.redirect('/')
})












module.exports = router