const Joi = require('joi')

const getAllCouponsValidationSchema = Joi.object({})
const validateCouponValidationSchema = Joi.object({
  couponCode: Joi.string().required(),
})

module.exports = {
  getAllCouponsValidationSchema,
  validateCouponValidationSchema,
}
