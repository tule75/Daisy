const express = require('express');
const router = express.Router();

const GioHangController = require('../app/controllers/GioHangController');

// router.get("/", GiohangController.gLogIn);

router.get("/", GioHangController.lay);

// router.get("/ship", logInController.ship)

module.exports = router