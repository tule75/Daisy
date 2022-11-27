const express = require('express');
const router = express.Router();

const KNBController = require('../app/controllers/NguoiBanController');


router.post("/sendproduct", KNBController.sent)
router.get("/", KNBController.show);

module.exports = router;