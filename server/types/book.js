const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    books(limit: Int skip: Int): [Book]!
  }
  extend type Mutation {
    createBooks(books: [BookInput]): [Book]
    deleteAllBooks: Book
  }
  type Book {
    _id: ID!
    title: String!
    coverUrl: String!
    rating: Float!
  }
  input BookInput{
    title: String!
    coverUrl: String!
  }
`;
