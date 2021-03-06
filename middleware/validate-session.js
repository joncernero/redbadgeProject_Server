const jwt = require('jsonwebtoken');
const Models = require('../models');

const validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token -->', token);
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (!err && decodeToken) {
        Models.User.findOne({
          where: {
            id: decodeToken.id,
          },
        })
          .then((user) => {
            if (!user) throw err;
            console.log(user);
            req.user = user;
            return next();
          })
          .catch((err) => next(err));
      } else {
        req.errors = err;
        return res.status(500).send('You Shall Not Pass!');
      }
    });
  }
};

module.exports = validateSession;
