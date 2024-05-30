const {
    checkoutCart,
    updateCart,
    getCart,
} = require('../../controllers/handlers/cart');
const { errorResponse, successResponse } = require('../../utils/responseUtil');

const checkoutCartService = (req, res, next) => {
    try {
        const data = checkoutCart(req);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

const updateCartService = (req, res, next) => {
    try {
        const data = updateCart(req);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

const cartService = (req, res, next) => {
    try {
        const data = getCart(req);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(next, error);
    }
};

module.exports = {
    checkoutCartService,
    updateCartService,
    cartService,
};
