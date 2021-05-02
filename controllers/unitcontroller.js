const { Router } = require('express');
let router = Router();
const { Unit, User, Property } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, function (req, res) {
  const newUnit = {
    name: req.body.name,
    unitNumber: req.body.unitNumber,
    bldgNumber: req.body.bldgNumber,
    numberOfBeds: req.body.numberOfBeds,
    numberOfBaths: req.body.numberOfBaths,
    totalSquareFootage: req.body.totalSquareFootage,
    propertyId: req.properties_propertyId_fkey,
  };
  console.log(req.body.unit);
  Unit.create(newUnit)
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

// router.get('/get/unit/:propertyId', validateSession, function (req, res) {
//   Unit.findAll()
//     .then((unit) => res.status(200).json(unit))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// router.get('/get/unit/:propertyId', validateSession, function (req, res) {
//   let unitNumber = req.params.unitNumber;
//   Unit.findAll({ where: { unitNumber: unitNumber } })
//     .then((unit) => res.status(200).json(unit))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// router.get('/get/unit/:propertyId', validateSession, function (req, res) {
//   const query = {
//     where: { unit: req.params.propertyId }
//   };
//   Unit.findOne(query)
//     .then((unit) => res.status(200).json(unit))
//     .catch((err) => res.status(500).json({ error: err }));
// });

router.get('/:propertyId', validateSession, function (req, res) {
  Unit.findAll({ where: { propertyId: req.params.propertyId } })
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, function (req, res) {
  const updateUnitInfo = {
    name: req.body.name,
    unitNumber: req.body.unitNumber,
    bldgNumber: req.body.bldgNumber,
    numberOfBeds: req.body.numberOfBeds,
    numberOfBaths: req.body.numberOfBaths,
    totalSquareFootage: req.body.totalSquareFootage,
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
