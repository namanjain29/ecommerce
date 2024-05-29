const { ENV } = require('../settings')
const { ERROR_CODE } = require('./httpCodeDetails')

const notFoundError = (req) => {
  const errorMessage = `${req.method} - ${req.path} not found`
  const error = new Error(errorMessage)
  error.code = ERROR_CODE.NOT_FOUND
  throw error
}

const onAppError = (error, _req, res, next) => {
  const { code, message, stack } = error

  // Set error property in res, so that it can be logged in request logs
  res.m_error = error

  if (ENV !== 'prod') {
    // returning stack trace in response only in non-prod environment
    return res
      .status(code || ERROR_CODE.INTERNAL_SERVER_ERROR)
      .send({ status: false, error: message, stack })
  }

  return res
    .status(code || ERROR_CODE.INTERNAL_SERVER_ERROR)
    .send({ status: false, error: message })
}

const onServerError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      return process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      return process.exit(1)
    default:
      throw error
  }
}

const throwError = (errorMessage, errorCode) => {
  const error = new Error(errorMessage)
  error.code = errorCode
  throw error
}

module.exports = {
  notFoundError,
  onAppError,
  onServerError,
  throwError,
}
