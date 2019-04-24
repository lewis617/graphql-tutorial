const { gql } = require('apollo-server');

module.exports = gql`
  "用户类型"
  type User {
    "用户ID"
    _id: ID!
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
    user(user: GetUserInput): User
    users: [User]
  }
  type Mutation {
    createUser(user: CreateUserInput!): User,
    updateUser(user: UpdateUserInput!): User,
    deleteUser(user: DeleteUserInput!): User,
  }
  input GetUserInput {
    _id: ID!
  }
  input CreateUserInput {
    name: String!
  }
  input UpdateUserInput {
    _id: ID!
    name: String
  }
  input DeleteUserInput {
    _id: ID!
  }
`;
