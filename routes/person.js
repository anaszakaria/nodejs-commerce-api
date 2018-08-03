const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

// controllers
const personController = require('../controllers/person')

// get all persons
router.get('/', personController.get_persons)

module.exports = router
