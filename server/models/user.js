const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, select: false },
  avatarUrl: { type: String },
  location: { type: String },
  intro: { type: String },
});

module.exports = model('User', userSchema);
