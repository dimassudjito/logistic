const productsResolvers = require('./products')
const locationsResolvers = require('./locations')

module.exports = {
  Query: {
    ...productsResolvers.Query,
    ...locationsResolvers.Query
  },
  Mutation: {
    ...productsResolvers.Mutation,
    ...locationsResolvers.Mutation
  }
}
