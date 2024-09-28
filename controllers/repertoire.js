const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// =========== render Index ============== //
router.get('/',(req,res) => {
    res.send('Index page')
})







// =========== send new form ============== //


// =========== send edit form ============== //







// =========== render show page ============== //









module.exports = router