const deepmerge = require('deepmerge');
const user = require('./user');
const book = require('./book');
const comment = require('./comment');

module.exports = deepmerge.all([comment, user, book]);
