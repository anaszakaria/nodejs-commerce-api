const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

// middleware
const multerUpload = require('../middleware/multer-upload')
const productUpload = multerUpload.init('./uploads/products/img')

// controllers
const productsController = require('../controllers/products')

// get all products
router.get('/', productsController.get_products)

// add product
router.post('/add', checkAuth, productUpload.single('productImage'), productsController.add_product)

// go to product page
router.get('/:productId', productsController.goto_product)

// update product
router.patch("/update/:productId", checkAuth, productsController.update_product)

// delete product
router.delete('/delete/:productId', checkAuth, productsController.delete_product)

module.exports = router
