// import bcryptjs
const bcrypt = require('bcryptjs')
// use express router **shortened version**
const router = require('express').Router()
// import the usermodel
const Users = require('../users/users-model.js')
router.post('/register', (req, res) => {
  // get the user from the body
  const user = req.body
  // hash using bcrypt model
  // the "8" means we are hashing the password 2 to the 8th times which is 256 times its hashing the password and continueing hashing the hash
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash // change the user password into a hash

  Users.add(user) // add method
    .then(saved => {
      // pass in an object so only the username and hash goes though instead of the entire object model
      res.status(201).json({ saved })
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/login', (req, res) => {
  // destruct the username and password from the body
  const { username, password } = req.body

  // pass in the object to select only the username from the object model that contains both username and password
  Users.findBy({ username })
    .first()
    // [user] was passed in like that, did not work, taking it out of the array fixed the issue
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username
        res.status(200).json({ message: `Welcome ${user.username}!` })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
      // if user is true and bcrypt.compareSync(password, user.password) is also true return the code on line 28 else return the code on line 30
      // bcrypt.compareSync(password, user.password) comparing the password provided with the password on file using bcryptjs, hasing the password provided and comparing the hash to the saved hash.
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// logout uses the req.session.destroy method to logout by deleting out sessions
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('unable to logout')
    } else {
      res.send('loggout out')
    }
  })
})

module.exports = router
