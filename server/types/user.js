const { gql } = require('apollo-server');

module.exports = gql`
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
