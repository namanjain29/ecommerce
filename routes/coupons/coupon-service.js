const {
    validateCoupon,
    getAllCouponsForUser,
} = require('../../controllers/handlers/coupon');
const { errorResponse, successResponse } = require('../../utils/responseUtil');

const getAllCouponsService = (req, res, next) => {
    try {
        const data = getAllCouponsForUser(req);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

const validateCouponService = (req, res, next) => {
    try {
        const data = validateCoupon(req);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

module.exports = {
    getAllCouponsService,
    validateCouponService,
};
