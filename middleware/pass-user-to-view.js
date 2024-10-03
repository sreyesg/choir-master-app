const passUserToView = (req, res, next) => {
    console.log('Made it here')
    res.locals.user = req.session.user ? req.session.user: null
    next()
}
module.exports = passUserToView