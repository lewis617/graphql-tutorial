const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    hello: String!
    user(user: GetUserInput): User!
    users: [User]!
    login(user: LoginInput!): Token!
    currentUser: User!
  }
  type Mutation {
    createUser(user: CreateUserInput!): User!
    updateUser(user: UpdateUserInput!): User!
    deleteUser(user: DeleteUserInput!): User!
  }
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
  type Token {
    "JWT Token，放在 Header 中传进来"
    token: String!
  }
  input GetUserInput {
    _id: ID!
  }
  input CreateUserInput {
    name: String!
    password: String!
  }
  input UpdateUserInput {
    _id: ID!
    name: String
    password: String!
  }
  input DeleteUserInput {
    _id: ID!
  }
  input LoginInput{
    name: String!
    password: String!
  }
`;
