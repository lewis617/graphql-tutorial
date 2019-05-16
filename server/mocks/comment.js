const casual = require('casual');

module.exports = {
  Comment: () => ({
    rating: () => casual.integer(0, 10),
    comment: () => casual.sentence,
  }),
  Comments: () => ({
    total: () => casual.integer(0, 1000),
  }),
};
