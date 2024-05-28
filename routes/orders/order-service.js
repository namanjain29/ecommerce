const { createOrder } = require('../../controllers/handlers/orders')
const { errorResponse } = require('../../utils/responseUtil')

const createOrderService = async (req, res, next) => {
  try {
    const data = await createOrder(req)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(next, error)
  }
}

module.exports = {
  createOrderService,
}
