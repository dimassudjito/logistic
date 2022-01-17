const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

require('dotenv').config()
const PORT: string | number = process.env.PORT || 5000

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB: logistic database connected')
    return server.listen({ port: PORT })
  })
  .then((res: any) => {
    console.log(`Server is running at ${res.url ? res.url : 'unknown url'}`)
  })
  .catch((err: any) => {
    console.error(err)
  })
