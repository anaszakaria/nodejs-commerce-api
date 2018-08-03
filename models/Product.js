const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: String,
    productName: String,
    brand: String,
    price: Number,
    imageURL: String,
    desc: String,
    categories: Array,
    tags: Array,
    createdAt: Date,
    updatedAt: Date
},
{
    collection: 'products'
})

module.exports = mongoose.model('Product', ProductSchema)
