const { Router } = require('express');
let router = Router();
const { Room } = require('../models');
let validateSession = require('../middleware/validate-session');
let validateAdmin = require('../middleware/validate-admin');

router.post('/create', validateSession, function (req, res) {
  const newRoom = {
    roomType: req.body.room.roomType,
    feature: req.body.room.feature,
    value: req.body.room.value,
    notes: req.body.room.notes,
    unitId: req.body.room.unitId,
  };
  Room.create(newRoom)
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get', validateSession, function (req, res) {
  Room.findAll()
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/get/unit/:id', validateSession, function (req, res) {
  Room.findAll({ where: { unitId: req.body.room.unitId } })
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, function (req, res) {
  const query = {
    where: { unitId: req.body.unitId },
    include: 'unit',
  };
  Room.findOne(query)
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, function (req, res) {
  const updateRoomInfo = {
    roomType: req.body.room.roomType,
    feature: req.body.room.feature,
    value: req.body.room.value,
    notes: req.body.room.notes,
    unitId: req.body.unitId,
  };

  const query = { where: { id: req.params.id } };

  Room.update(updateRoomInfo, query)
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.id } };

    Room.destroy(query)
      .then(() => res.status(200).json({ message: 'Room Removed' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
);

module.exports = router;
