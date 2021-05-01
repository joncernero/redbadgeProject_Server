const { Router } = require('express');
let router = Router();
const { Feature } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, function (req, res) {
  const newFeature = {
    feature: req.body.feature.feature,
    roomType: req.body.feature.roomType,
    value: req.body.feature.value,
    notes: req.body.feature.notes,
    unitId: req.body.unitId,
  };
  Feature.create(newFeature)
    .then((feature) => res.status(200).json(feature))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/', validateSession, function (req, res) {
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
    feature: req.body.feature,
    roomType: req.body.roomType,
    value: req.body.value,
    notes: req.body.notes,
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
