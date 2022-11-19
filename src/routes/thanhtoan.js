const express = require('express');
const router = express.Router();

const thanhtoan = require('../app/controllers/ThanhToanController')

router.get('/', thanhtoan.show)

module.exports = router;