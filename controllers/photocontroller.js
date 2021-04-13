let express = require('express');
const { Router } = require('express');
const router = Router();
let validateSession = require('../middleware/validate-session');
const { photo } = require('../models');

router.post('/create', validateSession, function (req, res) {
  const newPhoto = {
    name: req.body.photo.name,
    url: req.body.photo.url,
    roomId: req.body.roomId,
  };
  photo
    .create(newPhoto)
    .then((photo) => req.status(200).json(photo))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
