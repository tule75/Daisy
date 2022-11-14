const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const GioHangController = require('../app/controllers/GioHangController');

// newController.index
router.get('/:slug', siteController.showSlug)
router.get('/', siteController.index);
router.post('/', GioHangController.add);

module.exports = router;