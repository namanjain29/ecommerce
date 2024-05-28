const {
  checkoutCart,
  updateCart,
} = require('../../controllers/handlers/cart')
const { errorResponse } = require('../../utils/responseUtil')

const checkoutCartService = async (req, res, next) => {
  try {
    const data = checkoutCart(req)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(next, error)
  }
}

const updateCartService = async (req, res, next) => {
  try {
    const data = updateCart(req)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(next, error)
  }
}

module.exports = {
  checkoutCartService,
  updateCartService,
}
