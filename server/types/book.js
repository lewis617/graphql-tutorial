const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    books(limit: Int skip: Int q: String tag: String): [Book]!
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
    tags: [String]!
  }
  input BookInput{
    title: String!
    coverUrl: String!
    tags: [String]!
  }
`;
