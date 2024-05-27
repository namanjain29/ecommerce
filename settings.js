let { config = {} } = global
const configJson = require('./config.json')

config = { ...configJson, ...config }

module.exports = {
  SERVER_PORT: configJson.SERVER_PORT || 8000,
  ENV: configJson.ENV || 'dev',
}
