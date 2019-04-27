const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, select: false },
  avatarUrl: { type: String },
  location: { type: String },
  intro: { type: String },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false,
  },
  followingCount: { type: Number, required: true, default: 0 },
  followersCount: { type: Number, required: true, default: 0 },
});

module.exports = model('User', userSchema);
