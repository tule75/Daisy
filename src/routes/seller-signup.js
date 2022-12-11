const express = require('express');
const router = express.Router();

const signUpController = require('../app/controllers/SellSignupController');

router.get("/", signUpController.gLogIn);

router.post("/", signUpController.pLogIn);

module.exports = router