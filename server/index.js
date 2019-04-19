const { ApolloServer, gql } = require('apollo-server');

const users = [
  { id: '1', name: '李雷', age: 12 },
  { id: '2', name: '韩梅梅', isSingle: true },
]

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
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});