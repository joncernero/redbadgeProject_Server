let express = require('express');
const { Router } = require('express');
const router = Router();
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');
const { Photo } = require('../models');

router.post('/create', validateSession, function (req, res) {
  const newPhoto = {
    name: req.body.photo.name,
    url: req.body.photo.url,
    unitId: req.body.units_unitId_fkey,
  };
  Photo.create(newPhoto)
    .then((photo) => req.status(200).json(photo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get', validateSession, function (req, res) {
  Photo.findAll()
    .then((photo) => res.status(200).json(photo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, function (req, res) {
  const query = {
    where: { roomId: req.body.roomId },
    include: 'room',
  };
  Photo.findAll(query)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/room/:id', validateSession, function (req, res) {
  Photo.findAll({ where: { unitId: req.params.id } })
    .then((photo) => res.status(200).json(photo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, function (req, res) {
  const updatePhotoInfo = {
    name: req.body.photo.name,
  };

  const query = { where: { id: req.params.id } };

  Photo.update(updateUnitInfo, query)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };
    Photo.destroy(query)
      .then(() => res.status(200).json({ error: err }))
      .catch((err) => res.status(500).json({ error: err }));
  }
);

module.exports = router;
