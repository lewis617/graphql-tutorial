const Book = require('../models/book');

module.exports = {
  Query: {
    books: (parent, args) => Book.find()
      .limit(args.limit || 10)
      .skip(args.skip || 0),
  },
  Book: {
  },
  Mutation: {
    createBooks: (parent, args) => Book.create(args.books),
    deleteAllBooks: () => Book.deleteMany({}),
  },
};
