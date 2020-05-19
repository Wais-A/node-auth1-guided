const bcrypt = require('bcryptjs')// import bcryptjs
const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  const user = req.body;// get the user from the body
  const hash = bcrypt.hashSync(user.password, 8); // hash using bycrypt modle
  // the "8" means we are hashing the password 2 to the 8th times which is 256 times its hashing the password and continueing hashing the hash
  user.password = hash; // change the user password into a hash

  Users.add(user) // add method
    .then(saved => {
      res.status(201).json({saved});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body; // destruct the username and password fromt the body

  Users.findBy({ username })
    .first()
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
