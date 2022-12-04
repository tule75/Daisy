const express = require('express');
const router = express.Router();

const ProductController = require('../app/controllers/ProductController')

router.post('/create', ProductController.create)

module.exports = router
