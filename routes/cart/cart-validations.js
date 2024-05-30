const { validateSchema } = require('../../utils/validationUtil')
const {
  checkoutCartValidationSchema,
  updateCartValidationSchema,
  cartValidationSchema,
} = require('./cart-validation-schema')

const checkoutCartValidation = (req, res, next) => {
  const { body } = req
  validateSchema(checkoutCartValidationSchema, body, res)
  return next()
}

const updateCartValidation = (req, res, next) => {
  const { body } = req
  validateSchema(updateCartValidationSchema, body, res)
  return next()
}

const cartValidation = (req, res, next) => {
  const { body } = req
  validateSchema(cartValidationSchema, body, res)
  return next()
}

module.exports = {
  checkoutCartValidation,
  updateCartValidation,
  cartValidation,
}
