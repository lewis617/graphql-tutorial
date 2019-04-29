const { merge } = require('lodash');
const user = require('./user');
const book = require('./book');

module.exports = merge(user, book);
