const {
  validateCoupon,
  getAllCouponsForUser,
} = require('../../controllers/handlers/coupon')
const { errorResponse } = require('../../utils/responseUtil')

const getAllCouponsService = async (req, res, next) => {
  try {
    const data = await getAllCouponsForUser(req)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(next, error)
  }
}

const validateCouponService = async (req, res, next) => {
  try {
    const data = await validateCoupon(req)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(next, error)
  }
}

module.exports = {
  getAllCouponsService,
  validateCouponService,
}
