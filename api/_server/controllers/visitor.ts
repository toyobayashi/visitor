import type { RequestHandler } from 'express'
import { getCountAndIncrease } from '../models/counter'
import { errorBadge, visitorBadge } from '../utils/badge'

export const visitor: RequestHandler = async (req, res, next): Promise<void> => {
  const { uid } = req.query
  if (!uid) {
    res.status(200).type('svg').send(errorBadge('uid is required'))
    return
  }
  let count: number = -1
  try {
    count = await getCountAndIncrease(uid as string)
  } catch (err) {
    next(err)
    return
  }
  res.status(200).type('svg').send(visitorBadge(count))
}
