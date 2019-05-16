const { gql } = require('apollo-server');

module.exports = gql`
  extend type Mutation {
    updateComment(comment: UpdateCommentInput): Comment
    deleteComment(comment: DeleteCommentInput): Comment
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
  type Comments{
    total: Int!
    list: [Comment]
  }
  type Comment{
    _id: ID
    rating: Int
    comment: String
    stage: Stage
    bookId: ID!
    commentator: User
  }
  enum Stage{
    want
    reading
    done
  }
`;
