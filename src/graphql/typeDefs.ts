const gql = require('graphql-tag')

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    category: String
    manufacturer: String
    location: String
  }
  type Query {
    getProducts: [Product]
  }
`
