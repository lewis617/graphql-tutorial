const Comment = require('../models/comment');

module.exports = {
  Book: {
    myComment: async ({ _id }, args, context) => {
      let me;
      try {
        me = context.getUser();
      } catch (err) { console.error(err); }
      const defaultComment = {
        stage: null, rating: null, comment: null, bookId: null, _id: null,
      };
      if (!me) { return defaultComment; }
      const comment = await Comment.findOne({ bookId: _id, userId: me._id });
      return comment || defaultComment;
    },
  },
  Mutation: {
    updateComment: (parent, args, context) => {
      const { comment: { _id, ...rest } } = args;
      const userId = context.getUser()._id;
      if (_id) {
        return Comment.findByIdAndUpdate(_id, rest, { new: true });
      }
      return Comment.create({ ...rest, userId });
    },
    deleteComment: (parent, args) => Comment.findByIdAndDelete(args.comment._id),
  },
};
