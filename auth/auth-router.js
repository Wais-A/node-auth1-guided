const bcrypt = require('bcryptjs')// import bcryptjs
const router = require('express').Router(); // use express router **shortened version** 

const Users = require('../users/users-model.js');
// import the usermodel
router.post('/register', (req, res) => {
  const user = req.body;// get the user from the body
  const hash = bcrypt.hashSync(user.password, 8); // hash using bycrypt model
  // the "8" means we are hashing the password 2 to the 8th times which is 256 times its hashing the password and continueing hashing the hash
  user.password = hash; // change the user password into a hash

  Users.add(user) // add method
    .then(saved => {
      res.status(201).json({saved});// pass in an object so only the username and hash goes though instead of the entire object model
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body; // destruct the username and password from the body

  Users.findBy({ username }) // pass in the object to select only the username from the object model that contains both username and password
    .first()
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
      //if user is true and bcrypt.compareSync(password, user.password) is also true return the code on line 28 else return the code on line 30
      // bcrypt.compareSync(password, user.password) comparing the password provided with the password on file using bcyrptjs, hasing the password provided and comparing the hash to the saved hash.
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
