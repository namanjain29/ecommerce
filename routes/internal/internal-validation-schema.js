const Joi = require('joi')

const storeStatsValidationSchema = Joi.object({
  userId: Joi.string().required(),
})
const generateCouponValidationSchema = Joi.object({
  userId: Joi.string().required(),
})

module.exports = {
  storeStatsValidationSchema,
  generateCouponValidationSchema,
}
