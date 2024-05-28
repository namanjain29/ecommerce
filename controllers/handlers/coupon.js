const { couponCodeStatus } = require('../../constants')
const { discountCodes: inMemoryDiscountCodes } = require('../../inMemDb')
const { generateCouponCode } = require('../../utils/coupons')

const generateCoupon = async (params) => {
  const { userId, discountPercent } = params
  const couponCode = generateCouponCode(body)
  const couponCodeObject = {
    userId,
    couponCode,
    discountPercent,
    status: couponCodeStatus.ACTIVE,
  }
  inMemoryDiscountCodes.push(couponCodeObject)
}

const validateCoupon = async (req) => {
  const { couponCode } = req.body
  const userId = req.headers['user-id']
  const couponCodeObject = inMemoryDiscountCodes.find(
    (coupon) =>
      coupon.couponCode === couponCode &&
      coupon.userId === userId &&
      coupon.status === couponCodeStatus.ACTIVE
  )
  if (!couponCodeObject) {
    throw new Error('Invalid coupon code')
  }
  return couponCodeObject
}

const getAllCouponsForUser = async (req) => {
  const userId = req.headers['user-id']
  const userCoupons = inMemoryDiscountCodes.filter(
    (coupon) =>
      coupon.userId === userId && coupon.status === couponCodeStatus.ACTIVE
  )
  return userCoupons
}

module.exports = {
  generateCoupon,
  validateCoupon,
  getAllCouponsForUser,
}
