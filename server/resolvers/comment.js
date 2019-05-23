const Comment = require('../models/comment');
const Book = require('../models/book');

module.exports = {
  Book: {
    myComment: async ({ _id }, args, context) => {
      const me = context.user;
      if (!me) { return null; }
      const comment = await Comment.findOne({ bookId: _id, commentator: me._id });
      return comment;
    },
    comments: (parent, args) => ({ ...parent, ...args }),
  },
  Comments: {
    total: args => Comment.countDocuments({ bookId: args._id }),
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
    updateComment: async (parent, args, context) => {
      const { comment: { _id, ...rest } } = args;
      const commentator = context.user._id;
      const book = await Book.findById(rest.bookId);
      const totalRating = book.rating * book.ratingNumbers;
      if (_id) {
        const comment = await Comment.findByIdAndUpdate(_id, rest);
        book.rating = (totalRating + rest.rating - comment.rating) / book.ratingNumbers;
        book.save();
        return rest;
      }
      book.ratingNumbers += 1;
      book.rating = (totalRating + rest.rating) / book.ratingNumbers;
      book.save();
      return Comment.create({ ...rest, commentator });
    },
    deleteComment: async (parent, args) => {
      const comment = await Comment.findByIdAndDelete(args.comment._id);
      const book = await Book.findById(comment.bookId);
      const totalRating = book.rating * book.ratingNumbers;
      book.ratingNumbers -= 1;
      book.rating = book.ratingNumbers > 0
        ? ((totalRating - comment.rating) / book.ratingNumbers) : 0;
      book.save();
      return comment;
    },
  },
};
