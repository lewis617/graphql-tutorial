const { ApolloServer, gql, MockList } = require('apollo-server');
const casual = require('casual');

const typeDefs = gql`
  "用户类型"
  type User {
    "用户ID"
    id: ID!
    "用户名称"
    name: String!
    "用户年龄"
    age: Int
    """
    是否单身
    
    单身可撩 or 名花（草）有主
    """
    isSingle: Boolean
  }
  type Query {
    user(
      "参数：用户名称"
      name: String
      ): User
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
