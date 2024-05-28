const express = require('express')
const Validation = require('./cart-validations')
const Service = require('./cart-service')

const router = express.Router()
router.post(
  '/checkout',
  Validation.checkoutCartValidation,
  Service.checkoutCartService
)

module.exports = router
