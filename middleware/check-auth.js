const jwt = require('jsonwebtoken')
const config = require('../config/conf')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, config.JWT_KEY)
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed',
            desc: error
        })
    }
}
