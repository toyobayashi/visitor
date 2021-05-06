import type { Response } from 'express'

export interface IResponseError {
  code: number
  message: string
  extra?: object
}

export class ResponseError extends Error implements IResponseError {
  public constructor (public code: number, public message: string, public extra?: object) {
    super(message)
  }
}

export class ResponseData<T = any> {
  public constructor (public code: number, public data: T) {}
}

export function response<T = any> (res: Response, err: null | IResponseError, data?: ResponseData<T>): void {
  if (err) {
    res.status(err.code).json({ message: err.message, ...(err.extra ?? {}) })
  } else {
    if (data == null || data.code === 204) {
      res.sendStatus(204)
    } else {
      res.status(data.code).json(data.data)
    }
  }
}
