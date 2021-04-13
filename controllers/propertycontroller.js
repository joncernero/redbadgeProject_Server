const { Router } = require('express');
let router = Router();
const { Property } = require('../models');
let validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, function (req, res) {
  const newProperty = {
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    numberOfUnits: req.body.numberOfUnits,
    companyId: req.user.companyId,
  };
  Property.create(newProperty)
    .then((property) => res.status(200).json(property))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('');

module.exports = router;
