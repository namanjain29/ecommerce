const { validateSchema } = require('../../utils/validationUtil');
const {
    getAllCouponsValidationSchema,
    validateCouponValidationSchema,
} = require('./coupon-validation-schema');

const getAllCouponsValidation = (req, res, next) => {
    const { body } = req;
    validateSchema(getAllCouponsValidationSchema, body, res);
    return next();
};

const validateCouponValidation = (req, res, next) => {
    const { body } = req;
    validateSchema(validateCouponValidationSchema, body, res);
    return next();
};

module.exports = {
    getAllCouponsValidation,
    validateCouponValidation,
};
