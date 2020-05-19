// importing express router
const router = require('express').Router()
// importing auth router
const authRouter = require('../auth/auth-router.js')
// importing user router
const usersRouter = require('../users/users-router.js')
// restricted is a middleware
const restricted = require('../auth/restricted-middleware')

// giving access to authRouter via /auth http
router.use('/auth', authRouter)
// accesses userRouter though /users http
router.use('/users', restricted, usersRouter)

router.get('/', (req, res) => {
  res.json({ api: "It's alive" })
}) // test

module.exports = router
