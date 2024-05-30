const { validateSchema } = require('../../utils/validationUtil');
const {
    storeStatsValidationSchema,
    generateCouponValidationSchema,
} = require('./internal-validation-schema');

const storeStatsValidation = (req, res, next) => {
    const { body } = req;
    validateSchema(storeStatsValidationSchema, body, res);
    return next();
};

const generateCouponValidation = (req, res, next) => {
    const { body } = req;
    validateSchema(generateCouponValidationSchema, body, res);
    return next();
};

module.exports = {
    storeStatsValidation,
    generateCouponValidation,
};
