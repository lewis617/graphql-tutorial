const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    books(limit: Int skip: Int q: String tag: String): Books!
    book(_id: ID!): Book
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
    author: String!
    price: String!
    myComment: Comment!
    comments: Comments
  }
  type Books {
    total: Int!
    list: [Book]!
  }
  input BookInput{
    title: String!
    coverUrl: String!
    tags: [String]!
    author: String!
    price: String!
  }
`;
