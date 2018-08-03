const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

// controllers
const userController = require('../controllers/user')

// register user
router.post('/signup', userController.register_user)

// login
router.post('/login', userController.login)

// delete user
router.post('/delete/:userId', checkAuth, userController.delete_user)

module.exports = router
