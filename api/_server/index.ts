import { routes } from './routers'
import { response, ResponseError } from './utils/response'

import express = require('express')
import cors = require('cors')

const app = express()

app.set('x-powered-by', false)
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({
  verify (_req: express.Request, res: express.Response, buf: Buffer, encoding: string) {
    const jsonString = buf.toString(encoding as any)
    let obj: any
    try {
      obj = JSON.parse(jsonString)
    } catch (_) {
      const err = new ResponseError(400, 'Invalid JSON')
      response(res, err)
      throw err
    }
    if (typeof obj !== 'object' || obj === null) {
      const err = new ResponseError(400, 'Request body must be valid JSON')
      response(res, err)
      throw err
    }
    if (Object.keys(obj).length === 0) {
      const err = new ResponseError(400, 'Request body must include one field at least')
      response(res, err)
      throw err
    }
  }
}))

routes(app)

export = app
