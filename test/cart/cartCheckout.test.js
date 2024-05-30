const { checkoutCartService } = require('../../routes/cart/cart-service')
const {
  cart: inMemoryCartDb,
  couponCodes: inMemoryCouponDb,
  items: inMemoryItemsDb,
  orders: inMemoryOrdersDb,
} = require('../../inMemDb')
const { couponCodeStatus } = require('../../constants')
const { clearArray } = require('../utils')
const { generateCoupon } = require('../../controllers/handlers/coupon')

beforeEach(() => {
  Object.keys(inMemoryCartDb).forEach((key) => delete inMemoryCartDb[key])
  clearArray(inMemoryCouponDb)
  clearArray(inMemoryItemsDb)
  clearArray(inMemoryOrdersDb)
  inMemoryCartDb.user1 = [
    { productId: '1', quantity: 1 },
    { productId: '2', quantity: 2 },
  ]

  inMemoryItemsDb.push(
    { id: '1', name: 'Product 1', price: 100, countInStock: 10 },
    { id: '2', name: 'Product 2', price: 200, countInStock: 5 }
  )

  inMemoryCouponDb.push({
    code: 'DISCOUNT10',
    userId: 'user1',
    status: couponCodeStatus.ACTIVE,
    discountPercent: 10,
  })
})

// const generateCoupon = jest.fn()

describe('POST /api/cart/checkoutCart', () => {
  it('should throw an error if the cart is empty', () => {
    const req = {
      body: {},
      headers: { 'user-id': 'user2' },
    }

    expect(() => checkoutCartService(req)).toThrowError({
      message: 'Cart is empty',
      statusCode: 400,
    })
  })

  it('should throw an error if an item in the cart is not found in the store', () => {
    const req = {
      body: {},
      headers: { 'user-id': 'user1' },
    }

    clearArray(inMemoryItemsDb) // Clearing in-memory items

    expect(() => checkoutCartService(req)).toThrowError({
      message: 'Item not found',
      statusCode: 400,
    })
  })

  it('should throw an error if an item in the cart is out of stock', () => {
    const req = {
      body: {},
      headers: { 'user-id': 'user1' },
    }

    inMemoryItemsDb[1].countInStock = 1 // Set out of stock

    expect(() => checkoutCartService(req)).toThrowError({
      message: 'Item out of stock',
      statusCode: 400,
    })
  })

  it('should throw an error if the coupon code is invalid', () => {
    const req = {
      body: { couponCode: 'INVALIDCODE' },
      headers: { 'user-id': 'user1' },
    }

    expect(() => checkoutCartService(req)).toThrow('Invalid coupon code')
  })

  it('should apply discount for a valid coupon code', () => {
    const req = {
      body: { couponCode: 'DISCOUNT10' },
      headers: { 'user-id': 'user1' },
    }

    const order = checkoutCartService(req)

    expect(order.discount).toBe(50) // 10% of 500
    expect(order.finalBillAmount).toBe(450) // 500 - 50
    expect(inMemoryCouponDb[0].status).toBe(couponCodeStatus.USED) // Coupon should be marked as used
  })

  it('should process normal checkout without a coupon', () => {
    const req = {
      body: {},
      headers: { 'user-id': 'user1' },
    }

    const order = checkoutCartService(req)

    expect(order.totalBillAmount).toBe(500) // 1*100 + 2*200
    expect(order.discount).toBe(0)
    expect(order.finalBillAmount).toBe(500)
    expect(inMemoryCartDb.user1.length).toBe(0) // Cart should be emptied
  })

  it('should generate a coupon code after every nth order', () => {
    clearArray(inMemoryCouponDb) // Clearing in-memory coupons
    // coupon is generated every 3rd order
    for (let i = 0; i < 1; i++) {
      const req = {
        body: {},
        headers: { 'user-id': 'user1' },
      }
      checkoutCartService(req)
    }

    //  since every nth order gets a coupon code for 10% discount and can apply to their cart
    // coupon should be generated at n-1th order

    // Next order should generate a coupon
    const req = {
      body: {},
      headers: { 'user-id': 'user1' },
    }

    inMemoryCartDb.user1 = [
      { productId: '1', quantity: 1 },
      { productId: '2', quantity: 1 },
    ]
    checkoutCartService(req)

    expect(
      inMemoryCouponDb.filter(({ userId }) => userId === 'user1').length
    ).toBe(1)
  })
})
