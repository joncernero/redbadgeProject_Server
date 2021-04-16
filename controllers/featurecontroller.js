const { Router } = require('express');
let router = Router();
const { Feature } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, function (req, res) {
  const newFeature = {
    feature: req.body.room.feature,
    roomType: req.body.room.roomType,
    value: req.body.room.value,
    notes: req.body.room.notes,
    unitId: req.body.room.unitId,
  };
  Feature.create(newFeature)
    .then((feature) => res.status(200).json(feature))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get', validateSession, function (req, res) {
  Feature.findAll()
    .then((feature) => res.status(200).json(feature))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/unit/:id', validateSession, function (req, res) {
  Feature.findAll({ where: { unitId: req.params.id } })
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, function (req, res) {
  const query = {
    where: { unitId: req.body.unitId },
    include: 'unit',
  };
  Feature.findOne(query)
    .then((feature) => res.status(200).json(feature))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, function (req, res) {
  const updateFeature = {
    feature: req.body.room.feature,
    roomType: req.body.room.roomType,
    value: req.body.room.value,
    notes: req.body.room.notes,
  };

  const query = { where: { id: req.params.id } };

  Feature.update(updateFeature, query)
    .then((feature) => res.status(200).json(feature))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };

    Feature.destroy(query)
      .then(() => res.status(200).json({ message: 'Feature Removed' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
);

module.exports = router;
