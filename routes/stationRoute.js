'use strict';
// stationRoute
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const authenticator = require('../controllers/authenticator').createToken;

router.route('/')
  .get(stationController.station_list_get)
  .post(stationController.station_post)

router.route('/token')
  .post((req, res) => {
    const t = authenticator(req.body.secret);
    res.json({token: t});
  })

router.route('/:id')
  .get(stationController.station_get)
  .delete(stationController.station_remove)

module.exports = router;
