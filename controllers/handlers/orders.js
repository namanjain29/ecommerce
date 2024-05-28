const { throwError } = require('../../common/errorHandler')
const { orderStatus, couponCodeStatus } = require('../../constants')
const {
  items: inMemoryItems,
  discountCodes: inMemoryDiscountCodes,
  orders: inMemoryOrders,
} = require('../../inMemDb')
const { ORDER_MULTIPLE_FOR_COUPON_CODE } = require('../../settings')
const { generateCoupon } = require('./coupon')

const createOrder = async (req) => {
  const { body, headers } = req
  const userId = headers['user-id']
  const { orderItems, discountCode } = body
  let totalBillAmount = 0
  // assuming taxes are included in the price of the items
  orderItems.forEach((item) => {
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
  if (discountCode) {
    // check if the discount code is valid for the user
    const discountObj = inMemoryDiscountCodes.find(
      (obj) =>
        obj.code === discountCode &&
        obj.userId === userId &&
        obj.status === couponCodeStatus.ACTIVE
    )
    if (!discountObj) {
      throwError(400, 'Invalid discount code')
    }
    discount = (totalBillAmount * discountObj.discountPercent) / 100
  }
  const billAmount = totalBillAmount - discount
  const order = {
    userId,
    orderItems,
    discountCode,
    totalBillAmount,
    discount,
    billAmount,
    shippingAddress: body.shippingAddress,
    paymentMethod: body.paymentMethod,
    status: orderStatus.CONFIRMED,
  }
  inMemoryOrders.push(order)

  // update the countInStock of the items in the store
  orderItems.forEach((item) => {
    const dbItem = inMemoryItems.find((dbItem) => dbItem.id === item.productId)
    dbItem.countInStock -= item.quantity
  })
  // generate coupon code for the user for every nth order
  // code will be generated at n-1th order so that it can be used in the nth order
  const totalOrdersOfUser = inMemoryOrders.filter((order) => order.userId === userId).length
  if ((totalOrdersOfUser+1) % ORDER_MULTIPLE_FOR_COUPON_CODE === 0) {
    const discountPercent = 10
    generateCoupon({
      userId,
      discountPercent,
    })
  }
  return order
}

module.exports = {
  createOrder,
}
