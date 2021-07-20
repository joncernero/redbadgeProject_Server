const { Router } = require('express');
const router = Router();
const { Unit, User, Property } = require('../models');
const validateSession = require('../middleware/validate-session');
const validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, async (req, res) => {
  try {
    const property = await Property.findOne({
      where: { id: Number(req.body.propertyId) },
    });

    const unit = await Unit.create(req.body.unit);

    property.addUnit(unit);

    res.status(200).json(unit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
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

// ! Check if your headers are correct. Should be the same for all requests.

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };

    Unit.destroy(query)
      .then(() => res.status(200).json({ message: 'Unit Removed ' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
  // async (req, res) => {
  //   try {
  //     const totalUnitsRemoved = await Unit.destroy({
  //       where: {
  //         id: Number(req.params.id),
  //       },
  //     });

  //     res
  //       .status(200)
  //       .json({ message: `Unit(s) Removed: ${totalUnitsRemoved}` });
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).json({ error: e });
  //   }
  // }
);

module.exports = router;
