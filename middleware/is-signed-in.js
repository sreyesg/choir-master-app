const isSignedIn = (req, res, next) => {
    if(req.session.user) return next()
        res.render('/auth/sign-in')
    }

module.exports = isSignedIn