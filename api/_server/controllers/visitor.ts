import type { Request, Response } from 'express'
import { makeBadge } from 'badge-maker'
import { getCountAndIncrease } from '../models/counter'

const errorBadge = makeBadge({
  label: 'visitor',
  message: 'error',
  color: 'red'
})

export const visitor = async (req: Request, res: Response): Promise<void> => {
  const { uid } = req.query
  if (!uid) {
    console.error('uid is required')
    res.status(200).type('svg').send(errorBadge)
    return
  }
  let count: number = -1
  try {
    count = await getCountAndIncrease(uid as string)
  } catch (err) {
    console.error(err)
    res.status(200).type('svg').send(errorBadge)
    return
  }
  res.status(200).type('svg').send(makeBadge({
    label: 'visitor',
    message: count.toString(),
    color: 'blue'
  }))
}
