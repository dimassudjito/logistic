const productsResolvers = require('./products')

module.exports = {
  Query: {
    ...productsResolvers.Query
  },
  Mutation: {
    ...productsResolvers.Mutation
  }
}
