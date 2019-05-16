const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const commentSchema = new Schema({
  bookId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stage: { type: String, required: true },
  content: { type: String },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = model('Comment', commentSchema);
