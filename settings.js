let { config = {} } = global
const configJson = require('./config.json')

config = { ...configJson, ...config }

module.exports = {
  SERVER_PORT: configJson.SERVER_PORT || 8000,
  ENV: configJson.ENV || 'dev',
  ORDER_MULTIPLE_FOR_COUPON_CODE:
    configJson.ORDER_MULTIPLE_FOR_COUPON_CODE || 2,
}
