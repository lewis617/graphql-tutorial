const casual = require('casual');
const user = require('./user');

module.exports = {
  String: () => casual.word,
  ...user,
};
