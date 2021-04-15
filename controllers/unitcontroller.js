const { Router } = require('express');
let router = Router();
const { Unit, User } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, function (req, res) {
  const newUnit = {
    name: req.body.unit.name,
    unitNumber: req.body.unit.unitNumber,
    bldgNumber: req.body.unit.bldgNumber,
    numberOfBeds: req.body.unit.numberOfBeds,
    numberOfBaths: req.body.unit.numberOfBaths,
    totalSquareFootage: req.body.unit.totalSquareFootage,
    propertyId: req.body.unit.propertyId,
  };

  Unit.create(newUnit)
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get', validateSession, function (req, res) {
  Unit.findAll()
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/property/:id', validateSession, function (req, res) {
  const query = {
    where: { property: req.body.unit.propertyId },
    include: 'property',
  };
  Unit.findOne(query)
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/:id', validateSession, function (req, res) {
  Unit.findAll({ where: { propertyId: req.params.id } })
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, function (req, res) {
  const updateUnitInfo = {
    name: req.body.unit.name,
    unitNumber: req.body.unit.unitNumber,
    bldgNumber: req.body.unit.bldgNumber,
    numberOfBeds: req.body.unit.numberOfBeds,
    numberOfBaths: req.body.unit.numberOfBaths,
    totalSquareFootage: req.body.unit.totalSquareFootage,
  };

  const query = { where: { id: req.params.id } };

  Unit.update(updateUnitInfo, query)
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };
    Unit.destroy(query)
      .then(() => res.status(200).json({ message: 'Unit Removed' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
);

module.exports = router;
