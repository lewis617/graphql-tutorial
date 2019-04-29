const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    books(limit: Int skip: Int): [Book]!
  }
  type Book {
    _id: ID!
    title: String!
    coverUrl: String!
    rating: Float!
  }
`;
