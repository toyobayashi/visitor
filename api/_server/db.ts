import { connect as mongooseConnect, connection } from 'mongoose'
import type { Connection } from 'mongoose'

declare namespace global {
  export let mongo: {
    promise?: Promise<Connection>
  }
}

let cached = global.mongo
if (!cached) cached = global.mongo = {}

export function connect (): Promise<Connection> {
  if (cached.promise) {
    return cached.promise
  }
  if (!process.env.VISITOR_DB_USER || !process.env.VISITOR_DB_PASS || !process.env.VISITOR_DB_NAME) {
    throw new Error('DB Auth info not found')
  }
  cached.promise = new Promise<Connection>((resolve, reject) => {
    void mongooseConnect(
      `mongodb+srv://${process.env.VISITOR_DB_USER!}:${process.env.VISITOR_DB_PASS!}@${process.env.VISITOR_DB_HOST!}/${process.env.VISITOR_DB_NAME!}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      },
      function (err) {
        if (err) {
          reject(err)
          delete cached.promise
          return
        }
        resolve(connection)
      }
    )
  })
  return cached.promise
}
