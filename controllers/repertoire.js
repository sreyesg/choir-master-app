const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// =========== render Index ============== //
router.get('/',async(req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('repertoire/index.ejs', {
            repertoire: currentUser.repertoire
        })
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    
})

// =========== send new form ============== //
router.get('/new', (req, res) => {
    res.render('repertoire/new.ejs')
})
// ============ Create repertoire ========= //
router.post('/', async(req, res) => {
    try {
        
        const currentUser = await User.findById(req.session.user._id)
        currentUser.repertoire.push(req.body)
        currentUser.save()
        res.redirect(`/users/${req.session.user._id}/repertoire`)

    }catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// =========== render show page ============== //
router.get('/:songId', async(req,res) => {
    const currentUser = await User.findById(req.session.user._id)
    const song = currentUser.repertoire.id(req.params.songId)
    res.render('repertoire/show.ejs', {
        song, 
    })
})





// =========== send edit form ============== //
















module.exports = router