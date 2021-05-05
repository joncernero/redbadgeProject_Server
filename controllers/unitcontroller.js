const { Router } = require('express');
let router = Router();
const { Unit, User, Property } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, async (req, res) => {
  const newUnit = {
    name: req.body.unit.name,
    unitNumber: req.body.unit.unitNumber,
    bldgNumber: req.body.unit.bldgNumber,
    numberOfBeds: req.body.unit.numberOfBeds,
    numberOfBaths: req.body.unit.numberOfBaths,
    totalSquareFootage: req.body.unit.totalSquareFootage,
    // propertyId: req.body.units_propertyId_fkey,
  };

  try {
    const property = await Property.findOne({
      where: { id: req.body.unit.propertyId },
    });

    const unit = await Unit.create(newUnit);

    property.addUnit(unit);

    console.log('🚨', { unit, property });

    res.status(200).json(unit);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  // .then((unit) => res.status(200).json(unit.))
  // .catch((err) => res.status(500).json({ error: err }));
});

router.get('/', validateSession, function (req, res) {
  Unit.findAll()
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/unit/:unitNumber', validateSession, function (req, res) {
  let unitNumber = req.params.unitNumber;
  Unit.findAll({ where: { unitNumber: unitNumber } })
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/property/:id', validateSession, function (req, res) {
  const query = {
    where: { property: req.body.unit.propertyName },
    include: 'property',
  };
  Unit.findOne(query)
    .then((unit) => res.status(200).json(unit))
    .catch((err) => res.status(500).json({ error: err }));
});

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
