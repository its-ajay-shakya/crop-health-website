module.exports = {
    ensureAuth: function (req, res, next) {
      // is authenticated means are they looged in
      if (req.isAuthenticated()) {
        //moved on to the next thing
        console.log('authenticated')
        return next()
      } else {
        res.redirect('/')
      }
    }
  }