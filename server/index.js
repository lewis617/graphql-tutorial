const { ApolloServer } = require('apollo-server');
const casual = require('casual');
const mongoose = require('mongoose');
const typeDefs = require('./types');
const resolvers = require('./resolvers');

mongoose.connect('mongodb+srv://lewis:mukewang123@cluster0-vxsgm.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on('error', console.error);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: { String: () => casual.word },
  mockEntireSchema: false,
  rootValue: { name: 'rootValue' },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
