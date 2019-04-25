const { AuthenticationError } = require('apollo-server');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const { secret } = require('../config');

module.exports = {
  Query: {
    user: (parent, args) => User.findById(args.user._id),
    users: () => User.find(),
    login: async (parent, args) => {
      const user = await User.findOne(args.user);
      if (!user) { throw new AuthenticationError('用户名或密码不正确'); }
      const { _id, name } = user;
      const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
      return { token };
    },
  },
  Mutation: {
    createUser: (parent, args) => new User(args.user).save(),
    updateUser: (parent, args) => User.findByIdAndUpdate(args.user._id, args.user, { new: true }),
    deleteUser: (parent, args) => User.findByIdAndRemove(args.user._id),
  },
};
