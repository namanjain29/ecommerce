const express = require('express')
const Validation = require('./coupon-validations')
const Service = require('./coupon-service')

const router = express.Router()
router.post(
  '/validate',
  Validation.validateCouponValidation,
  Service.validateCouponService
)
router.get(
  '/getAll',
  Validation.getAllCouponsValidation,
  Service.getAllCouponsService
)

module.exports = router
