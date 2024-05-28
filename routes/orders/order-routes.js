const express = require('express')
const Validation = require('./order-validations')
const Service = require('./order-service')

const router = express.Router()
router.post(
  '/create',
  Validation.createOrderValidation,
  Service.createOrderService
)

module.exports = router
