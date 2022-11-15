const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const GioHangController = require('../app/controllers/GioHangController');
const LogInController = require('../app/controllers/LogInController');

// newController.index
router.get('/logout', LogInController.gLogOut)
router.get('/:slug', siteController.showSlug)
router.get('/', siteController.index);
router.post('/', GioHangController.add);

module.exports = router;