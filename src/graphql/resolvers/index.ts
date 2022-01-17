const productsResolvers = require('./products')

module.exports = {
  Query: {
    ...productsResolvers.Query
  }
}
