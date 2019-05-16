const { gql } = require('apollo-server');

module.exports = gql`
  extend type Mutation {
    updateComment(comment: UpdateCommentInput): MyComment
    deleteComment(comment: DeleteCommentInput): MyComment
  }
  input UpdateCommentInput{
    _id: ID
    rating: Float
    comment: String
    stage: Stage!
    bookId: ID!
  }
  input DeleteCommentInput{
    _id: ID!
  }
  type MyComment{
    _id: ID
    rating: Int
    comment: String
    stage: Stage
    bookId: ID!
  }
  enum Stage{
    want
    reading
    done
  }
`;
