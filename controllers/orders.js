const mongoose = require('mongoose')

// models
const Order = require('../models/Order')
const Product = require('../models/Product')

// get orders
exports.get_orders = (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .populate('productId', 'productId productName brand price')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.productId,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

// create orders
exports.create_order = (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            productId: req.body.productId
        })
        return order.save()
    })
    .then(result => {
        res.status(201).json({
            message: "Order stored",
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + result._id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// go to order page
exports.goto_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('productId')
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: "GET",
                url: "http://localhost:3000/orders"
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

// delete order
exports.delete_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        return order.remove({ _id: req.params.orderId })
    })
    .then(order => {
        res.status(200).json({
            message: "Order deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/orders",
                body: { productId: "ID", quantity: "Number" }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}
