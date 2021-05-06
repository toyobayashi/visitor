import type { RequestHandler } from 'express'

import { connect } from '../db'

export function mongo (): RequestHandler {
  return function (_req, _res, next) {
    connect().then(() => {
      next()
    }).catch((err) => {
      next(err)
    })
  }
}
