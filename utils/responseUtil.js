const { ERROR_CODE } = require('../common/httpCodeDetails')

const successResponse =  (res, data, httpCode = 200) => {
  if (res && res.connection) {
    const response = { status: true, data }
    return res.status(httpCode).json(response)
  }
  return data // For Jest testing
}

const errorResponse =  (next, error) => {
  if (next) {
    return next(error)
  }
  return error.code || ERROR_CODE.INTERNAL_SERVER_ERROR // For Jest testing
}

module.exports = { successResponse, errorResponse }
