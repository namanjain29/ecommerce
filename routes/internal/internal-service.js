const { generateCouponByAdmin } = require('../../controllers/handlers/coupon');
const { generateStoreStats } = require('../../controllers/handlers/store');
const { errorResponse, successResponse } = require('../../utils/responseUtil');

const generateCouponService = (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = body;
        const discountPercent = 10;
        const data = generateCouponByAdmin({
            userId,
            discountPercent,
        });
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

const storeStatsService = (req, res, next) => {
    try {
        const data = generateStoreStats(req);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

module.exports = {
    generateCouponService,
    storeStatsService,
};
