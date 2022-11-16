const express = require('express');
const router = express.Router();

const GioHangController = require('../app/controllers/GioHangController');
const BuyController = require('../app/controllers/BuyController');

// router.get("/", GiohangController.gLogIn);

router.get("/", GioHangController.lay);
// router.get("/ship", logInController.ship)

module.exports = router