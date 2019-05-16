const Comment = require('../models/comment');

module.exports = {
  Book: {
    myComment: async ({ _id }) => {
      const comment = await Comment.findOne({ bookId: _id });
      return comment || {
        stage: null, rating: null, comment: null, bookId: null, _id: null,
      };
    },
  },
  Mutation: {
    updateComment: (parent, args) => {
      const { comment: { _id, ...rest } } = args;
      if (_id) {
        return Comment.findByIdAndUpdate(_id, rest, { new: true });
      }
      return Comment.create(rest);
    },
    deleteComment: (parent, args) => Comment.findByIdAndDelete(args.comment._id),
  },
};
