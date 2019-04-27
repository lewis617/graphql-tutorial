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
  type User {
    _id: ID!
    name: String
    avatarUrl: String
    location: String
    intro: String
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
    password: String
    avatarUrl: String
    location: String
    intro: String
  }
  input DeleteUserInput {
    _id: ID!
  }
  input LoginInput{
    name: String!
    password: String!
  }
`;
