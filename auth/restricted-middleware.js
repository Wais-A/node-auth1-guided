// insures we have a session in place and if that session contains a valid user object
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'not logged in' })
  }
}
