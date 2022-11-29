const express = require('express');
const router = express.Router();

const wishlistController = require('../app/controllers/WishListController')

router.post('/find', wishlistController.find);
router.post('/add', wishlistController.add)
router.get('/:slug', wishlistController.show)

module.exports = router