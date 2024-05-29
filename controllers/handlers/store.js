const { orders: inMemoryOrders, couponCodes } = require('../../inMemDb')

const generateStoreStats = (req) => {
  const { body } = req;
  const { userId } = body;
  const userOrders = inMemoryOrders.filter((order) => order.userId === userId)
  const totalPurchaseAmount = userOrders.reduce(
    (sum, order) => sum + order.totalBillAmount,
    0
  )
  const totalDiscountAmount = userOrders.reduce(
    (sum, order) => sum + (order.totalBillAmount - order.finalBillAmount),
    0
  )
  
  const totalItemsPurchased = userOrders.reduce(
    (sum, order) => sum + order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
    0
  )

  const discountCodes = couponCodes

  return {
    itemCount: totalItemsPurchased,
    totalPurchaseAmount,
    discountCodes,
    totalDiscountAmount,
  }
}

module.exports = {
  generateStoreStats,
}
