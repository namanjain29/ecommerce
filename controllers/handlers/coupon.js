const { throwError } = require('../../common/errorHandler');
const { couponCodeStatus } = require('../../constants');
const { couponCodes: inMemoryDiscountCodes } = require('../../inMemDb');
const { generateCouponCode } = require('../../utils/couponsUtil');
const { orders: inMemoryOrders } = require('../../inMemDb');
const { ORDER_MULTIPLE_FOR_COUPON_CODE } = require('../../settings');

const generateCoupon = (params) => {
    const { userId, discountPercent } = params;
    const couponCode = generateCouponCode();
    const couponCodeObject = {
        userId,
        couponCode,
        discountPercent,
        status: couponCodeStatus.ACTIVE,
    };
    inMemoryDiscountCodes.push(couponCodeObject);
    return couponCodeObject;
};

const generateCouponByAdmin = (params) => {
    const { userId, discountPercent } = params;
    // generate coupon code for the user for every nth order
    const totalOrdersOfUser = inMemoryOrders.filter(
        (order) => order.userId === userId
    ).length;
    if (
        totalOrdersOfUser % ORDER_MULTIPLE_FOR_COUPON_CODE === 0 &&
        totalOrdersOfUser > 0
    ) {
        return generateCoupon({
            userId,
            discountPercent,
        });
    } else {
        throwError('Cannot generate coupon for this user', 500);
    }
};

const validateCoupon = (req) => {
    const { couponCode } = req.body;
    const userId = req.headers['user-id'];
    const couponCodeObject = inMemoryDiscountCodes.find(
        (coupon) =>
            coupon.couponCode === couponCode &&
            coupon.userId === userId &&
            coupon.status === couponCodeStatus.ACTIVE
    );
    if (!couponCodeObject) {
        throw new Error('Invalid coupon code');
    }
    return { message: 'Coupon code is valid' };
};

const getAllCouponsForUser = (req) => {
    const userId = req.headers['user-id'];
    const userCoupons = inMemoryDiscountCodes.filter(
        (coupon) =>
            coupon.userId === userId &&
            coupon.status === couponCodeStatus.ACTIVE
    );
    return userCoupons;
};

module.exports = {
    generateCoupon,
    validateCoupon,
    getAllCouponsForUser,
    generateCouponByAdmin,
};
