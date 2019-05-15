const Book = require('../models/book');

module.exports = {
  Query: {
    books: (parent, args) => Book
      .find({ title: new RegExp(args.q), tags: { $in: args.tag || /^/ } })
      .limit(args.limit || 10)
      .skip(args.skip || 0),
    book: (parent, args) => Book.findById(args._id),
  },
  Book: {
  },
  Mutation: {
    createBooks: (parent, args) => Book.create(args.books),
    deleteAllBooks: () => Book.deleteMany({}),
  },
};
