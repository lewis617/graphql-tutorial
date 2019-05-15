const Book = require('../models/book');

module.exports = {
  Query: {
    books: (parent, args) => args,
    book: (parent, args) => Book.findById(args._id),
  },
  Books: {
    total: args => Book.count({ title: new RegExp(args.q), tags: { $in: args.tag || /^/ } }),
    list: args => Book
      .find({ title: new RegExp(args.q), tags: { $in: args.tag || /^/ } })
      .limit(args.limit || 10)
      .skip(args.skip || 0),
  },
  Mutation: {
    createBooks: (parent, args) => Book.create(args.books),
    deleteAllBooks: () => Book.deleteMany({}),
  },
};
