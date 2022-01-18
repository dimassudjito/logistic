const gql = require('graphql-tag')

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    category: String
    manufacturer: String
    location: String
  }
  type Location {
    id: ID!
    name: String!
    city: String
  }
  input ProductInput {
    name: String
    category: String
    manufacturer: String
    location: String
  }
  input LocationInput {
    name: String
    city: String
  }
  type Query {
    getProducts: [Product]
    getLocations: [Location]
  }
  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(productId: ID!): String!
    updateProduct(productId: ID!, productInput: ProductInput): Product!
    createLocation(locationInput: LocationInput): Location
  }
`
