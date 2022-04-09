const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')

const grapQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()
app.use(bodyParser.json())

app.use((isAuth))

app.use('/graphql', graphqlHttp({
  schema: grapQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

app.use('/health-check', (req, res) => {
  return res.send('API is working')
})

const mongoDbUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongodb:27017/${process.env.MONGO_DB}?authSource=admin`
console.log('mongoDbUrl', mongoDbUrl)

mongoose.connect(mongoDbUrl)
  .then(() => {
    console.log('Mongodb connected')
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
    console.log('err')
  })
