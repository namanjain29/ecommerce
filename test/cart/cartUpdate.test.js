const { updateCartService } = require('../../routes/cart/cart-service')
const {
  cart: inMemoryCartDb,
  couponCodes: inMemoryCouponDb,
  items: inMemoryItemsDb,
  orders: inMemoryOrdersDb,
} = require('../../inMemDb')
const { clearArray } = require('../utils')

const resetMockData = () => {
  Object.keys(inMemoryCartDb).forEach((key) => delete inMemoryCartDb[key])
  clearArray(inMemoryCouponDb)
  clearArray(inMemoryItemsDb)
  clearArray(inMemoryOrdersDb)
  inMemoryItemsDb.push(
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      countInStock: 10,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      countInStock: 0,
    },
    {
      id: '3',
      name: 'Product 3',
      price: 300,
      countInStock: 30,
    },
    {
      id: '4',
      name: 'Product 4',
      price: 400,
      countInStock: 40,
    },
    {
      id: '5',
      name: 'Product 5',
      price: 500,
      countInStock: 50,
    }
  )
  inMemoryCartDb.user1 = [{ productId: '1', quantity: 1 }]
}

const mockRequest = (body, headers) => ({
  body,
  headers,
})

describe('POST /api/cart/updateCart', () => {
  beforeEach(() => {
    resetMockData()
  })

  it('should add an item to the cart', () => {
    const req = mockRequest(
      { productId: '1', event: 'add' },
      { 'user-id': 'user2' }
    )

    const response = updateCartService(req)

    expect(response).toEqual({ message: 'Cart Successfully updated!' })
    expect(inMemoryCartDb.user2).toEqual([{ productId: '1', quantity: 1 }])
  })

  it('should increment the quantity of an existing item in the cart', () => {
    const req = mockRequest(
      { productId: '1', event: 'add' },
      { 'user-id': 'user1' }
    )

    const response = updateCartService(req)

    expect(response).toEqual({ message: 'Cart Successfully updated!' })
    expect(inMemoryCartDb.user1).toEqual([{ productId: '1', quantity: 2 }])
  })

  it('should remove an item from the cart when quantity is 1', () => {
    const req = mockRequest(
      { productId: '1', event: 'remove' },
      { 'user-id': 'user1' }
    )

    const response = updateCartService(req)

    expect(response).toEqual({ message: 'Cart Successfully updated!' })
    expect(inMemoryCartDb.user1).toEqual([])
  })

  it('should throw an error if product is not found in memory db when adding', () => {
    const req = mockRequest(
      { productId: '999', event: 'add' },
      { 'user-id': 'user1' }
    )

    expect(() => updateCartService(req)).toThrowError({
      message: 'Product not found',
      statusCode: 400,
    })
  })

  it('should throw an error if adding an out of stock product', () => {
    const req = mockRequest(
      { productId: '2', event: 'add' },
      { 'user-id': 'user1' }
    )

    expect(() => updateCartService(req)).toThrowError({
      message: 'Product not found',
      statusCode: 400,
    })
  })

  it('should throw an error if trying to remove a product not found in memory db', () => {
    const req = mockRequest(
      { productId: '999', event: 'remove' },
      { 'user-id': 'user1' }
    )

    expect(() => updateCartService(req)).toThrowError({
      message: 'Product not found',
      statusCode: 400,
    })
  })

  it('should throw an error if trying to remove a product not found in cart', () => {
    const req = mockRequest(
      { productId: '2', event: 'remove' },
      { 'user-id': 'user1' }
    )

    expect(() => updateCartService(req)).toThrowError({
      message: 'Cannot remove, product not found in cart!',
      statusCode: 400,
    })
  })

  it('should handle adding a new item to the cart when cart is empty', () => {
    const req = mockRequest(
      { productId: '1', event: 'add' },
      { 'user-id': 'user3' }
    )

    const response = updateCartService(req)

    expect(response).toEqual({ message: 'Cart Successfully updated!' })
    expect(inMemoryCartDb.user3).toEqual([{ productId: '1', quantity: 1 }])
  })

  it('should handle removing a product reducing quantity correctly', () => {
    inMemoryCartDb.user2 = [{ productId: '1', quantity: 3 }]

    const req = mockRequest(
      { productId: '1', event: 'remove' },
      { 'user-id': 'user2' }
    )

    const response = updateCartService(req)

    expect(response).toEqual({ message: 'Cart Successfully updated!' })
    expect(inMemoryCartDb.user2).toEqual([{ productId: '1', quantity: 2 }])
  })
})
