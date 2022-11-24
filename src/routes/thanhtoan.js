const express = require('express');
const router = express.Router();

const thanhtoan = require('../app/controllers/ThanhToanController')

router.post('/create', thanhtoan.push)
router.get('/cart', thanhtoan.showC)
router.get('/:slug', thanhtoan.showO)

module.exports = router;