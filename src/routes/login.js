const express = require('express');
const router = express.Router();

const logInController = require('../app/controllers/LogInController');

router.get("/", logInController.gLogIn);

router.post("/", logInController.pLogIn);

// router.get("/ship", logInController.ship)

module.exports = router