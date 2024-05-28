const { orders: inMemoryOrders, couponCodes } = require('../../inMemDb')

const generateStoreStats = (req) => {
  const totalPurchaseAmount = inMemoryOrders.reduce(
    (sum, order) => sum + order.totalBillAmount,
    0
  )
  const totalDiscountAmount = orders.reduce(
    (sum, order) => sum + (order.totalBillAmount - order.finalBillAmount),
    0
  )

  const discountCodes = couponCodes

  return {
    itemCount: orders.length,
    totalPurchaseAmount,
    discountCodes,
    totalDiscountAmount,
  }
}

module.exports = {
  generateStoreStats,
}
