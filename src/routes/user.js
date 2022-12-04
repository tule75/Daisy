const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController')

router.post('/took', userController.took)
router.get('/:slug', userController.show)

module.exports = router
