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
    currentUser: (parent, args, context) => User.findById(context.getUser()._id),
  },
  Mutation: {
    createUser: (parent, args) => new User(args.user).save(),
    updateUser: (parent, args, context) => {
      if (args.user._id !== context.getUser()._id) { throw new AuthenticationError('没有权限'); }
      return User.findByIdAndUpdate(args.user._id, args.user, { new: true });
    },
    deleteUser: (parent, args, context) => {
      if (args.user._id !== context.getUser()._id) { throw new AuthenticationError('没有权限'); }
      return User.findByIdAndRemove(args.user._id);
    },
  },
};
