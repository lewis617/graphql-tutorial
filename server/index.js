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
  type Mutation {
    createUser(user: CreateUserInput!): User,
    updateUser(user: UpdateUserInput!): User,
    deleteUser(user: DeleteUserInput!): User,
  }
  input CreateUserInput {
    name: String!
  }
  input UpdateUserInput {
    id: ID!
    name: String
  }
  input DeleteUserInput {
    id: ID!
  }
`;
const resolvers = {
  Query: {
    user: (parent, args) => ({ name: args.name }),
    users: () => [],
  },
  Mutation: {
    createUser: (parent, args) => {
      console.log('createUser args: ', args);
      return { name: args.user.name };
    },
    updateUser: (parent, args) => {
      console.log('updateUser args: ', args);
      return { id: args.user.id };
    },
    deleteUser: (parent, args) => {
      console.log('deleteUser args: ', args);
      return { id: args.user.id };
    },
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
