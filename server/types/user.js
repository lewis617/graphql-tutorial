const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    user(user: UserIdInput): User!
    users: [User]!
    currentUser: User
  }
  type Mutation {
    createUser(user: CreateUserInput!): User!
    updateUser(user: UpdateUserInput!): User!
    deleteUser(user: UserIdInput!): User!
    login(user: LoginInput!): UserWithToken!
    follow(user: UserIdInput): IsFollowing!
  }
  type User {
    _id: ID!
    name: String
    avatarUrl: String
    location: String
    intro: String
    isMe: Boolean
    isFollowing: Boolean
    following(limit: Int skip: Int): [User]
    followers(limit: Int skip: Int): [User]
    followingCount: Int
    followersCount: Int
  }
  type UserWithToken {
    "JWT Token，放在 Header 中传进来"
    token: String!
    _id: ID!
    name: String
  }
  type IsFollowing{
    isFollowing: Boolean
  }
  input UserIdInput {
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
  input LoginInput{
    name: String!
    password: String!
  }
`;
