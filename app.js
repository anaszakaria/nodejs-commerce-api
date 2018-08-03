const httpErrors = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// import routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/user')
const person = require('./routes/person')
const products = require('./routes/products')
const orders = require('./routes/orders')

// start express
const app = express()

// mongoose
const db = require('./db/mongoose')

// middleware
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Cross-Origin Resource Sharing (CORS)
// app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE')
        return res.status(200).json({})
    }
    next()
})

//static files
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public/images', express.static(__dirname + '/public/images'))

// configure routes
app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/person', person)
app.use('/products', products)
app.use('/orders', orders)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(httpErrors(404))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
