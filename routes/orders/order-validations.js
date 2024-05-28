const { createOrderValidationSchema } = require('./order-validation-schema')

const createOrderValidation = (req, res, next) => {
  const { body } = req
  validateSchema(createOrderValidationSchema, body, res)
  return next()
}

module.exports = {
  createOrderValidation,
}
