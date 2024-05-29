const Joi = require('joi')

const checkoutCartValidationSchema = Joi.object({
  shippingAddress: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.string().allow('online', 'cash').required(),
  couponCode: Joi.string(),
})

const updateCartValidationSchema = Joi.object({
  productId: Joi.string().required(),
  event: Joi.string().allow('add', 'delete').required(),
})

const cartValidationSchema = Joi.object({})

module.exports = {
  checkoutCartValidationSchema,
  updateCartValidationSchema,
  cartValidationSchema,
}
