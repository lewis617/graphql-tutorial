const Comment = require('../models/comment');

module.exports = {
  Book: {
    myComment: async ({ _id }, args, context) => {
      let me;
      try {
        me = context.getUser();
      } catch (err) { console.error(err); }
      const defaultComment = {
        stage: null, rating: null, content: null, bookId: null, _id: null,
      };
      if (!me) { return defaultComment; }
      const comment = await Comment.findOne({ bookId: _id, commentator: me._id });
      return comment || defaultComment;
    },
    comments: (parent, args) => ({ ...parent, ...args }),
  },
  Comments: {
    total: args => Comment.count({ bookId: args._id }),
    list: args => Comment
      .find({ bookId: args._id })
      .limit(args.limit || 10)
      .skip(args.skip || 0)
      .populate('commentator'),
  },
  Comment: {
    updatedAt: parent => parent.updatedAt.toLocaleString(),
    commentator: parent => parent.commentator,
  },
  Mutation: {
    updateComment: (parent, args, context) => {
      const { comment: { _id, ...rest } } = args;
      const commentator = context.getUser()._id;
      if (_id) {
        return Comment.findByIdAndUpdate(_id, rest, { new: true });
      }
      return Comment.create({ ...rest, commentator });
    },
    deleteComment: (parent, args) => Comment.findByIdAndDelete(args.comment._id),
  },
};
