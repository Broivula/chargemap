'use strict';
// stationRoute
const express = require('express');
const router = express.Router();
const authenticator = require('../controllers/authenticator').createToken;

router.route('/')
  .post((req, res) => {
    const t = authenticator(req.body.secret);
    res.json({token: t});
  })

module.exports = router;

