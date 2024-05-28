const { checkoutOrder } = require('../../controllers/handlers/orders')
const { errorResponse } = require('../../utils/responseUtil')

const checkoutOrderService = async (req, res, next) => {
  try {
    const data = await checkoutOrder(req)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(next, error)
  }
}

module.exports = {
  checkoutOrderService,
}
