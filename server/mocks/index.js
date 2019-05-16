const casual = require('casual');
const user = require('./user');
const book = require('./book');
const comment = require('./comment');

module.exports = {
  String: () => casual.word,
  ...user,
  ...book,
  ...comment,
};
