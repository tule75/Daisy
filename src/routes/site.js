const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const SlugController = require('../app/controllers/SlugController');
const GioHangController = require('../app/controllers/GioHangController');
const LogInController = require('../app/controllers/LogInController');
const ThanhToanController = require('../app/controllers/ThanhToanController');

// newController.index
router.post('/createbill', ThanhToanController.createbill)
router.get('/logout', LogInController.gLogOut)
router.get('/:slug', SlugController.show)
router.get('/', siteController.index);
router.post('/', GioHangController.add);

module.exports = router;
