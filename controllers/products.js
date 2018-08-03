const mongoose = require('mongoose')

// models
const Product = require('../models/Product')

// get all products
exports.get_products = (req, res, next) => {
    Product.find({})
    .exec()
    .then(docs => {
        console.log(docs)
        if (docs.length >= 0) {
            res.status(200).json(docs)
        } else {
            res.status(409).json({
                message: 'No entries found'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

// add product
exports.add_product = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        productName: req.body.productName,
        brand: req.body.brand,
        price: req.body.price,
        imageURL: 'http://192.168.2.232:3000/' + req.file.path,
        desc: req.body.desc,
        categories: req.body.categories,
        tags: req.body.tags,
        createdAt: new Date(),
        updatedAt: req.body.updatedAt
    })
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'POST to /products/add successful',
            createdProduct: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

// go to product page
exports.goto_product = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
    .select('productId productName brand price imageURL desc')
    .exec()
    .then(doc => {
        console.log("From DB", doc)
        if (doc) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: 'No valid entry for ID'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

// update product
exports.update_product = (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

// delete product
exports.delete_product = (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}
