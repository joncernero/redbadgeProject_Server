const { Router } = require('express');
const router = Router();
const { User } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', validateSession, function (req, res) {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    companyId: req.user.companyId,
  })
    .then(function registrationSuccess(user) {
      const token = jwt.sign(
        { id: user.id, companyId: user.companyId },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      res.status(200).json({
        user: user,
        message: 'You signed up!',
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        // res.json({ user: user })
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user,
                message: 'Welcome Back!',
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: 'Login Failed' });
            }
          }
        );
      } else {
        res
          .status(500)
          .json({ error: "I don't think we have you signed up yet." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/', validateSession, validateAdmin, function (req, res) {
  User.findAll()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update', validateSession, function (req, res) {
  const updateUserInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 13),
  };
  const query = { where: { id: req.user.id } };

  User.update(updateUserInfo, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, validateAdmin, function (req, res) {
  const updateRolesInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
  };
  const query = { where: { id: req.params.id } };

  User.update(updateRolesInfo, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };

    User.destroy(query)
      .then(() => res.status(200).json({ message: 'User Removed' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
);

module.exports = router;
