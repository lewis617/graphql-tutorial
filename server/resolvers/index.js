const { merge } = require('lodash');
const user = require('./user');
const book = require('./book');
const comment = require('./comment');

module.exports = merge(comment, user, book);
