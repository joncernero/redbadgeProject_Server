const { Router } = require('express');
let router = Router();
const { Property } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

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

router.get('/get', validateSession, function (req, res) {
  Property.findAll()
    .then((property) => res.status(200).json(property))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/company/:id', validateSession, function (req, res) {
  Property.findAll({ where: { companyId: req.params.id } })
    .then((property) => res.status(200).json(property))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/:id', validateSession, function (req, res) {
  const query = {
    where: { companyId: req.user.companyId },
    include: 'company',
  };
  Property.findOne(query)
    .then((property) => res.status(200).json(property))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, function (req, res) {
  const updatePropertyInfo = {
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    numberOfUnits: req.body.numberOfUnits,
  };

  const query = { where: { id: req.params.id } };

  Property.update(updatePropertyInfo, query)
    .then((property) => res.status(200).json(property))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };

    Property.destroy(query)
      .then(() => res.status(200).json({ message: 'Property Removed' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
);

module.exports = router;
