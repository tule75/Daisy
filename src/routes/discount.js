const express = require('express');
const router = express.Router();

const DiscountController = require('../app/controllers/DiscountController');

router.post("/", DiscountController.pDiscount);

module.exports = router;