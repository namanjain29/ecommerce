const { inspect } = require('util')
const { ERROR_CODE } = require('../common/httpCodeDetails')
const { throwError } = require('../common/errorHandler')

const validateSchema = (schema, data, res) => {
  const { error, value: formattedData } = schema.validate(data)
  if (error) {
    return throwError(
      `Invalid value ${inspect(formattedData)}: ${inspect(error.details[0].message)}`,
      ERROR_CODE.BAD_REQUEST
    )
  }
  res.locals.formattedData = formattedData
  return res
}

module.exports = { validateSchema }
