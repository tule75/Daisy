const express = require('express');
const router = express.Router();

const logInController = require('../app/controllers/SellLogInController');

router.get("/", logInController.gLogIn);

router.post("/", logInController.pLogIn);

module.exports = router