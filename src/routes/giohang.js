const express = require('express');
const router = express.Router();

const GioHangController = require('../app/controllers/GioHangController');
const BuyController = require('../app/controllers/BuyController');

// router.get("/", GiohangController.gLogIn);
router.post('/delete', GioHangController.delete)
router.post('/plus', GioHangController.plus)
router.post('/minus', GioHangController.minus)
router.get("/", GioHangController.lay);
// router.get("/ship", logInController.ship)

module.exports = router