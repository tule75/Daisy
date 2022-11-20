const express = require('express');
const router = express.Router();

const KNBController = require('../app/controllers/NguoiBanController');

router.get("/", KNBController.show);

module.exports = router;