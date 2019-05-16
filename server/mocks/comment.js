const casual = require('casual');
const { MockList } = require('apollo-server');

module.exports = {
  Comment: () => ({
    rating: () => casual.integer(0, 10),
    content: () => casual.sentences(5),
    updatedAt: () => casual.date(),
  }),
  Comments: (parent, args) => ({
    total: () => casual.integer(0, 1000),
    list: () => new MockList(args.limit),
  }),
};
