const express = require('express');
const router = express.Router();

const signUpController = require('../app/controllers/SignUpController');

router.post("/cp", signUpController.Signup);

module.exports = router