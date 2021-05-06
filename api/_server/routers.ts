import { mongo } from './middleware/mongo'
import { visitor } from './controllers/visitor'
import { errorBadge } from './utils/badge'

import express = require('express')

const options: express.RouterOptions = {
  caseSensitive: true,
  strict: true
}

export function routes (app: express.Express): void {
  const rootRouter = express.Router(options)

  const mongoMiddleware = mongo()

  rootRouter.get('/visitor', mongoMiddleware, visitor, function (err, _req, res, _next) {
    console.error(err)
    res.status(200).type('svg').send(errorBadge())
  } as express.ErrorRequestHandler)

  app.use('/api', rootRouter)
}
