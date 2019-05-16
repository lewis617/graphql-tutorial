import gql from 'graphql-tag';

export const UPDATE_COMMENT = gql`
  mutation($comment: UpdateCommentInput){
    updateComment(comment:$comment){
      _id
      rating
      comment
      stage
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation($comment: DeleteCommentInput){
    deleteComment(comment:$comment){
      _id
    }
  }
`;
