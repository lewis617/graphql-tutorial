const { ApolloServer } = require('apollo-server');
const casual = require('casual');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const { connectionStr, secret } = require('./config');

mongoose.connect(connectionStr, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on('error', console.error);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: { String: () => casual.word },
  mockEntireSchema: false,
  context: ({ req }) => {
    const getUser = () => {
      const { authorization } = req.headers;
      const token = authorization && (authorization.split(' ')[0] === 'Bearer') && authorization.split(' ')[1];
      const { _id, name } = jsonwebtoken.verify(token, secret);
      return { _id, name };
    };
    return { getUser };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
