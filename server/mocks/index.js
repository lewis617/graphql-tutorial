const casual = require('casual');
const user = require('./user');
const book = require('./book');

module.exports = {
  String: () => casual.word,
  ...user,
  ...book,
};
