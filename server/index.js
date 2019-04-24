const { ApolloServer, MockList } = require('apollo-server');
const casual = require('casual');
const typeDefs = require('./types');
const resolvers = require('./resolvers');

const mocks = {
  String: () => casual.word,
  User: () => ({
    name: () => casual.name,
    age: () => casual.integer(0, 120),
  }),
  Query: () => ({
    users: () => new MockList([0, 12]),
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
  rootValue: { name: 'rootValue' },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
