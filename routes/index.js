const express = require('express')
const orderRoutes = require('./orders/order-routes')
const couponRoutes = require('./coupons/coupon-routes')
const router = express.Router()
const { throwError } = require('../common/errorHandler')

const validateHeaders = (headers) => {
  if (!headers['user-id']) {
    return throwError(`Request header does not have user-id`, ERROR_CODE.NOT_FOUND)
  }
  return null
}

router.use('/order', validateHeaders, orderRoutes)
router.use('/coupon', validateHeaders, couponRoutes)

module.exports = router
