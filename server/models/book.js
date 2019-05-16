const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const bookSchema = new Schema({
  title: { type: String, required: true },
  coverUrl: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  ratingNumbers: { type: Number, required: true, default: 0 },
  tags: { type: [String] },
});

module.exports = model('Book', bookSchema);
