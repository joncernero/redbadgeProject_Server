const { Router } = require('express');
const router = Router();
const { Company } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/create', validateSession, validateAdmin, function (req, res) {
  console.log(req.user.id);
  const newCompany = {
    companyName: req.body.companyName,
    companyAddress: req.body.companyAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    logo: req.body.logo,
    userId: req.user.id,
  };
  Company.create(newCompany)
    .then((company) => res.status(200).json(company))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/:id', validateSession, function (req, res) {
  Company.findOne()
    .then((company) => res.status(200).json(company))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, validateAdmin, function (req, res) {
  const updateCompany = {
    companyName: req.body.companyName,
    streetAddress: req.body.companyAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    logo: req.body.logo,
  };

  const query = { where: { id: req.params.id } };

  Company.update(updateCompany, query)
    .then(
      (newCompany) => res.status(200).json(newCompany),
      function updateError(err) {
        res.send(500, err.message);
      }
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
