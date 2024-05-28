const express = require('express')
const orderRoutes = require('./orders/order-routes')
const router = express.Router()

router.use('/order', orderRoutes)

module.exports = router
