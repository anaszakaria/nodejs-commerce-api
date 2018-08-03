const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

// controllers
const ordersController = require('../controllers/orders')

// get orders
router.get('/', ordersController.get_orders)

// create orders
router.post("/create", ordersController.create_order)

// go to order page
router.get('/:orderId', ordersController.goto_order)

// delete order
router.delete('/delete/:orderId', ordersController.delete_order)

module.exports = router
