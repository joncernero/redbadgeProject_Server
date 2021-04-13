const { Router } = require('express');
let router = Router();
const { room } = require('../models');
let validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, function (req, res) {
  const newRoom = {
    roomType: req.body.room.roomType,
    feature: req.body.room.feature,
    value: req.body.room.value,
    notes: req.body.room.notes,
    unitId: req.body.unitId,
  };
  room
    .create(newRoom)
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
