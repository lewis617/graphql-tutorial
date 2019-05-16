const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const commentSchema = new Schema({
  bookId: { type: String, required: true },
  stage: { type: String, required: true },
  comment: { type: String },
  rating: { type: Number, default: 0 },
});

module.exports = model('Comment', commentSchema);
