const express = require('express')
const cartRoutes = require('./cart/cart-routes')
const couponRoutes = require('./coupons/coupon-routes')
const internalRoutes = require('./internal/internal-routes')

const { throwError } = require('../common/errorHandler')
const { ERROR_CODE } = require('../common/httpCodeDetails')

const validateHeaders = (req, res, next) => {
  if (!req.headers['user-id']) {
    return throwError(
      `Request header does not have user-id`,
      ERROR_CODE.NOT_FOUND
    )
  }
  next();
}
// for admin routes
const router = express.Router()
router.use('/internal', internalRoutes)
router.use('/cart', validateHeaders, cartRoutes);
router.use('/coupon', validateHeaders, couponRoutes);

module.exports = router;
