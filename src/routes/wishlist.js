const express = require('express');
const router = express.Router();

const wishlistController = require('../app/controllers/WishListController')

router.get('/:slug', wishlistController.show)

module.exports = router