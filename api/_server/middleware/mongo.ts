import type { RequestHandler } from 'express'

import { connect } from '../db'

export function mongo (): RequestHandler {
  return function (_req, res, next) {
    connect().then(() => {
      next()
    }).catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
  }
}
