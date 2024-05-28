const Joi = require('joi')

const storeStatsValidationSchema = Joi.object({})
const generateCouponValidationSchema = Joi.object({
  userId: string
})

module.exports = {
  storeStatsValidationSchema,
  generateCouponValidationSchema,
}
