const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/conf')

// models
const User = require('../models/User')

const SALT_WORK_FACTOR = 10

// register user
exports.register_user = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail already exist'
            })
        } else {
            bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hash) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'User Created'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

// login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Auth Failed'
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, config.JWT_KEY, { expiresIn: '1h' })
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token,
                    email: user.email
                })
            }
            res.status(401).json({
                message: 'Auth Failed'
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

// delete user
exports.delete_user = (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}
