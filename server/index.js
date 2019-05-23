const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const mocks = require('./mocks');
const { connectionStr, secret } = require('./config');

mongoose.connect(connectionStr, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on('error', console.error);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
  context: ({ req }) => {
    let user = null;
    try {
      const { authorization } = req.headers;
      const token = authorization && (authorization.split(' ')[0] === 'Bearer') && authorization.split(' ')[1];
      const { _id, name } = jsonwebtoken.verify(token, secret);
      user = { _id, name };
    } catch (err){ } // eslint-disable-line
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
