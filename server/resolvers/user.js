const User = require('../models/user');

module.exports = {
  Query: {
    user: (parent, args) => User.findById(args.user._id),
    users: () => User.find(),
  },
  Mutation: {
    createUser: (parent, args) => new User(args.user).save(),
    updateUser: (parent, args) => User.findByIdAndUpdate(args.user._id, args.user, { new: true }),
    deleteUser: (parent, args) => User.findByIdAndRemove(args.user._id),
  },
};
