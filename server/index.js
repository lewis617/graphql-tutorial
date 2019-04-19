const { ApolloServer, gql, MockList } = require('apollo-server');
const casual = require('casual');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int
    isSingle: Boolean
  }
  type Query {
    users: [User]
  }
`;
const resolvers = {
  Query: {
    users: () => [],
  },
};

const mocks = {
  // String: () => casual.word,
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
  // mockEntireSchema: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
