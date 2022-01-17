const gql = require('graphql-tag')

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    category: String
    manufacturer: String
    location: String
  }
  input ProductInput {
    name: String!
    category: String
    manufacturer: String
    location: String
  }
  type Query {
    getProducts: [Product]
  }
  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(productId: ID!): String!
  }
`
