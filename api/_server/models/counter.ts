import { Schema, model, Document } from 'mongoose'

const counterSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  remark: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

export interface CounterDocument extends Document {
  uid: string
  count: number
  remark: string
  createdAt: Date
  updatedAt: Date
}

const Counter = model<CounterDocument>('Counter', counterSchema, 'Counter')

export async function createCounter (uid: string, count?: number): Promise<CounterDocument> {
  const doc = await Counter.create(new Counter({
    uid,
    ...(typeof count === 'number' ? { count } : {})
  }))
  return doc
}

export async function getCountAndIncrease (uid: string): Promise<number> {
  let counter = await Counter.findOneAndUpdate({ uid }, { $inc: { count: 1 } }, { useFindAndModify: false })
  if (!counter) {
    counter = await createCounter(uid, 1)
    return 0
  }
  return counter.count
}

export { Counter }
