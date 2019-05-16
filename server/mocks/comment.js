const casual = require('casual');

module.exports = {
  MyComment: () => ({
    rating: () => casual.integer(0, 10),
    comment: () => casual.sentence,
  }),
};
