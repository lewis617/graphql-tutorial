const { AuthenticationError } = require('apollo-server');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const { secret } = require('../config');

module.exports = {
  Query: {
    user: async (parent, args) => User.findById(args.user._id),
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
  User: {
    following: async (parent, args) => {
      const user = await User.findById(parent._id)
        .select('+following')
        .populate({
          path: 'following',
          options: {
            limit: args.limit || 10,
            skip: args.skip || 0,
          },
        });
      return user && user.following;
    },
    followers: (parent, args) => User
      .find({ following: parent._id })
      .limit(args.limit || 10)
      .skip(args.skip || 0),
    isFollowing: async (parent, args, context) => {
      let me;
      try {
        me = context.getUser();
      } catch (err) { console.error(err); }
      if (!me) { return false; }
      const user = await User.findOne({
        _id: me._id,
        following: parent._id,
      });
      return Boolean(user);
    },
    isMe: (parent, args, context) => {
      let me;
      try {
        me = context.getUser();
      } catch (err) { console.error(err); }
      if (!me) { return false; }
      return me._id === parent._id;
    },
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
    follow: async (parent, args, context) => {
      const me = await User.findById(context.getUser()._id).select('+following');
      let isFollowing = false;
      if (!me.following.map(id => id.toString()).includes(args.user._id)) {
        me.following.push(args.user._id);
        me.followingCount += 1;
        await User.findByIdAndUpdate(args.user._id, { $inc: { followersCount: 1 } });
        isFollowing = true;
      } else {
        me.following.splice(args.user._id, 1);
        me.followingCount -= 1;
        await User.findByIdAndUpdate(args.user._id, { $inc: { followersCount: -1 } });
      }
      me.save();
      return { isFollowing };
    },
  },
};
