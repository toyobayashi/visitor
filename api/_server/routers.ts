import { mongo } from './middleware/mongo'
import { visitor } from './controllers/visitor'

import express = require('express')

const options: express.RouterOptions = {
  caseSensitive: true,
  strict: true
}

export function routes (app: express.Express): void {
  const rootRouter = express.Router(options)

  const mongoMiddleware = mongo()

  rootRouter.get('/visitor', mongoMiddleware, visitor)

  app.use('/api', rootRouter)
}
