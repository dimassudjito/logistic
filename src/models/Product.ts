const { model, Schema } = require('mongoose')

const productSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  manufacturer: String,
  location: String
})

module.exports = model('Product', productSchema)
