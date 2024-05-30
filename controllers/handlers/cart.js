const { throwError } = require('../../common/errorHandler');
const { orderStatus, couponCodeStatus } = require('../../constants');
const {
    items: inMemoryItems,
    couponCodes: inMemoryCouponCodes,
    orders: inMemoryOrders,
    cart: inMemoryCart,
} = require('../../inMemDb');
const { ORDER_MULTIPLE_FOR_COUPON_CODE } = require('../../settings');
const { generateCoupon } = require('./coupon');

const checkoutCart = (req) => {
    const { body, headers } = req;
    const userId = headers['user-id'];
    const { couponCode } = body;
    let totalBillAmount = 0;
    const userProductsCart = inMemoryCart[userId];
    // check if the cart is empty
    if (!userProductsCart || userProductsCart.length === 0) {
        throwError('Cart is empty', 400);
    }
    // assuming taxes are included in the price of the items
    userProductsCart.forEach((item) => {
        // check if the items are available in the store
        const dbItem = inMemoryItems.find(
            (dbItem) => dbItem.id === item.productId
        );
        if (!dbItem) {
            throwError('Item not found', 400);
        }
        if (dbItem.countInStock < item.quantity) {
            throwError('Item out of stock', 400);
        }
        totalBillAmount += dbItem.price * item.quantity;
    });
    let discount = 0;
    // Validate the coupon code
    if (couponCode) {
        // check if the coupon code is valid for the user
        const couponObj = inMemoryCouponCodes.find(
            (obj) =>
                obj.code === couponCode &&
                obj.userId === userId &&
                obj.status === couponCodeStatus.ACTIVE
        );
        if (!couponObj) {
            throwError('Invalid coupon code', 400);
        } else {
            // disable the coupon code after using it
            const couponIndex = inMemoryCouponCodes.findIndex(
                (obj) =>
                    obj.code === couponCode &&
                    obj.userId === userId &&
                    obj.status === couponCodeStatus.ACTIVE
            );
            inMemoryCouponCodes[couponIndex].status = couponCodeStatus.USED;
        }
        discount = (totalBillAmount * couponObj.discountPercent) / 100;
    }
    const finalBillAmount = totalBillAmount - discount;
    const order = {
        userId,
        orderItems: userProductsCart,
        couponCode,
        totalBillAmount,
        discount,
        finalBillAmount,
        shippingAddress: body.shippingAddress,
        paymentMethod: body.paymentMethod,
        status: orderStatus.CONFIRMED,
    };
    // saving the order in the in-memory db
    inMemoryOrders.push(order);

    // empty cart of the user
    inMemoryCart[userId] = [];

    // update the countInStock of the items in the store
    userProductsCart.forEach((item) => {
        const dbItem = inMemoryItems.find(
            (dbItem) => dbItem.id === item.productId
        );
        // check if the items are available in the store
        if (dbItem.countInStock < item.quantity) {
            throwError(`${item.name} out of stock`, 400);
        } else {
            dbItem.countInStock -= item.quantity;
        }
    });

    // generate coupon code for the user for every nth order
    // code will be generated at n-1th order so that it can be used in the nth order
    const totalOrdersOfUser = inMemoryOrders.filter(
        (order) => order.userId === userId
    ).length;
    if ((totalOrdersOfUser + 1) % ORDER_MULTIPLE_FOR_COUPON_CODE === 0) {
        const discountPercent = 10; // 10% discount
        generateCoupon({
            userId,
            discountPercent,
        });
    }
    return order;
};

const updateCart = (req) => {
    const { body, headers } = req;
    const userId = headers['user-id'];
    const { productId, event } = body;
    const product = inMemoryItems.find((dbItem) => dbItem.id === productId);
    // check if product is present or if event is add, then quantity in store should be grater than 1
    if (!product || (product.countInStock < 1 && event === 'add')) {
        throwError('Product not found', 400);
    }
    let userProductsCart = inMemoryCart[userId] || [];
    const productAlreadyPresentInCartIndex = userProductsCart.findIndex(
        (product) => product.productId === productId
    );

    // if product in already present in the cart
    if (productAlreadyPresentInCartIndex !== -1) {
        if (event === 'add') {
            userProductsCart[productAlreadyPresentInCartIndex].quantity += 1;
        } else {
            // if only one quantity is present then remove the product from cart
            if (
                userProductsCart[productAlreadyPresentInCartIndex].quantity ===
                1
            ) {
                userProductsCart = userProductsCart.filter(
                    (product) => product.productId !== productId
                );
            } else {
                userProductsCart[productAlreadyPresentInCartIndex].quantity -=
                    1;
            }
        }
    } else {
        if (event === 'add') {
            userProductsCart.push({
                productId,
                quantity: 1,
            });
        } else {
            throwError('Cannot remove, product not found in cart!', 400);
        }
    }
    inMemoryCart[userId] = userProductsCart;
    return {
        message: 'Cart Successfully updated!',
    };
};

const getCart = (req) => {
    const { headers } = req;
    const userId = headers['user-id'];
    const userProductsCart = inMemoryCart[userId] || [];
    return userProductsCart;
};

module.exports = {
    checkoutCart,
    updateCart,
    getCart,
};
