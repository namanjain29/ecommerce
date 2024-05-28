const Joi = require('joi')

const createOrderValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
  shippingAddress: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.string().allow('online', 'cash').required(),
  discountCode: Joi.string(),
  shippingPrice: Joi.number().required(),
})

module.exports = {
  createOrderValidationSchema,
}
