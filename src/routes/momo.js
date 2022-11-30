const express = require('express');
const router = express.Router();

const momoController = require('../app/controllers/MomoController');

router.post("/", momoController.thanhtoan);

// router.get("/ship", logInController.ship)

module.exports = router