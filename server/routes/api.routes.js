const router = require('express').Router()

//auth routes
const authRoute = require('./auth.routes')

router.use('/auth',authRoute)

module.exports = router