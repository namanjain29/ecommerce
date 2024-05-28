const { validateSchema } = require('../../utils/validationUtil')
const { checkoutCartValidationSchema } = require('./cart-validation-schema')

const checkoutCartValidation = (req, res, next) => {
  const { body } = req
  validateSchema(checkoutCartValidationSchema, body, res)
  return next()
}

module.exports = {
  checkoutCartValidation,
}
