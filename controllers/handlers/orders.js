const { throwError } = require('../../common/errorHandler')
const { orderStatus, couponCodeStatus } = require('../../constants')
const {
  items: inMemoryItems,
  couponCodes: inMemoryCouponCodes,
  orders: inMemoryOrders,
  cart: inMemoryCart,
} = require('../../inMemDb')
const { ORDER_MULTIPLE_FOR_COUPON_CODE } = require('../../settings')
const { generateCoupon } = require('./coupon')

const checkoutOrder = async (req) => {
  const { body, headers } = req
  const userId = headers['user-id']
  const { orderItems, couponCode } = body
  let totalBillAmount = 0
  const userProductsCart = inMemoryCart[userId]
  // assuming taxes are included in the price of the items
  userProductsCart.forEach((item) => {
    // check if the items are available in the store
    const dbItem = inMemoryItems.find((dbItem) => dbItem.id === item.productId)
    if (!dbItem) {
      throwError(404, 'Item not found')
    }
    if (dbItem.countInStock < item.quantity) {
      throwError(400, 'Item out of stock')
    }
    totalBillAmount += dbItem.price * item.quantity
  })
  let discount = 0
  // Validate the coupon code
  if (couponCode) {
    // check if the coupon code is valid for the user
    const couponObj = inMemoryCouponCodes.find(
      (obj) =>
        obj.code === discountCode &&
        obj.userId === userId &&
        obj.status === couponCodeStatus.ACTIVE
    )
    if (!couponObj) {
      throwError(400, 'Invalid coupon code')
    }
    discount = (totalBillAmount * discountObj.discountPercent) / 100
  }
  const finalBillAmount = totalBillAmount - discount
  const order = {
    userId,
    orderItems,
    discountCode,
    totalBillAmount,
    discount,
    finalBillAmount,
    shippingAddress: body.shippingAddress,
    paymentMethod: body.paymentMethod,
    status: orderStatus.CONFIRMED,
  }
  // saving the order in the in-memory db
  inMemoryOrders.push(order)

  // empty cart of the user
  inMemoryCart[userId] = [];

  // update the countInStock of the items in the store
  orderItems.forEach((item) => {
    const dbItem = inMemoryItems.find((dbItem) => dbItem.id === item.productId)
    dbItem.countInStock -= item.quantity
  })

  // generate coupon code for the user for every nth order
  // code will be generated at n-1th order so that it can be used in the nth order
  const totalOrdersOfUser = inMemoryOrders.filter(
    (order) => order.userId === userId
  ).length
  if ((totalOrdersOfUser + 1) % ORDER_MULTIPLE_FOR_COUPON_CODE === 0) {
    const discountPercent = 10; // 10% discount
    generateCoupon({
      userId,
      discountPercent,
    })
  }
  return order
}

module.exports = {
  checkoutOrder,
}
