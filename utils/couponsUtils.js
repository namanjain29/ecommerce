const crypto = require('crypto')

// generate a random coupon code for the user
const generateCouponCode = (userId) => {
  const couponCode = crypto.randomBytes(12).toString('hex').toUpperCase()
  return couponCode
}

module.exports = {
  generateCouponCode,
}
