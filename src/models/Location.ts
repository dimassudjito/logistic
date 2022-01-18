import { model, Schema } from 'mongoose'

const locationSchema = new Schema({
  name: { type: String, required: true },
  city: String
})

module.exports = model('Location', locationSchema)
