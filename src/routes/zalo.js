const express = require('express');
const router = express.Router();

const zaloController = require('../app/controllers/ZaloController')

router.post('/sendmessage', zaloController.send)

module.exports = router