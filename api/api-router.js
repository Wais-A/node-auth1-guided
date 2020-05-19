const router = require('express').Router(); // importing express router

const authRouter = require('../auth/auth-router.js'); // importing auth router

const usersRouter = require('../users/users-router.js'); // importing user router

router.use('/auth', authRouter); // giving access to authRouter via /auth http
router.use('/users', usersRouter); // accesses userRouter though /users http

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
}); // test

module.exports = router;
