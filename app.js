/* eslint-disable no-unused-vars */
const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http')
const cors = require('cors')
const routes = require('./routes')
const { SERVER_PORT } = require('./settings')
const {
  notFoundError,
  onAppError,
  onServerError,
} = require('./common/errorHandler')

const port = SERVER_PORT
const app = express()
const server = http.createServer(app)

const corsMiddleware = (_req, res, _next) => {
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.end()
}

const serverInit =  () => {
  console.log(`🚀 Server ready at port: ${port}`)
}

app.use(
  cors({
    maxAge: 86400,
    preflightContinue: true,
  })
)

app.options('*', corsMiddleware)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/api', routes);
app.use(notFoundError)
app.use(onAppError)

app.set('port', port)
server.listen(port, serverInit)
server.on('error', onServerError)
