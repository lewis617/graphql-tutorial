const casual = require('casual');
const { MockList } = require('apollo-server');
const user = require('./user');
const book = require('./book');

module.exports = {
  String: () => casual.word,
  Query: () => ({
    books: (parent, args) => new MockList(args.limit),
  }),
  ...user,
  ...book,
};
