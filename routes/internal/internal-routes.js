const express = require('express')
const Validation = require('./internal-validations')
const Service = require('./internal-service')

const router = express.Router()
router.post(
  '/store/generateCoupon',
  Validation.generateCouponValidation,
  Service.generateCouponService
)
router.get(
  '/store/stats',
  Validation.storeStatsValidation,
  Service.storeStatsService
)

module.exports = router
