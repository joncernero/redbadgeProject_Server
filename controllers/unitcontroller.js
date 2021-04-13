const { Router } = require('express');
let router = Router();
const { unit } = require('../models');
let validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, function (req, res) {
  const newUnit = {
    name: req.body.unit.name,
    unitNumber: req.body.unit.unitNumber,
    bldgNumber: req.body.unit.bldgNumber,
    numberOfBeds: req.body.unit.numberOfBeds,
    numberOfBaths: req.body.unit.numberOfBaths,
    totalSquareFootage: req.body.unit.totalSquareFootage,
    propertyId: req.body.propertyId,
  };
  unit
    .create(newUnit)
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
