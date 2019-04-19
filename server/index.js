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
    user(name: String): User
    users: [User]
  }
`;
const resolvers = {
  Query: {
    user: (parent, args) => {
      console.log(parent, args);
      return { name: args.name };
    },
    users: () => [],
  },
};

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
