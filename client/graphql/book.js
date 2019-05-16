import gql from 'graphql-tag';

export const BOOKS = gql`
  query($limit: Int, $skip: Int, $q: String, $tag: String) {
    books(limit: $limit, skip: $skip, q: $q, tag: $tag){
      total
      list {
        _id
        title
        coverUrl
        rating
      }
    }
  }
`;

export const BOOK = gql`
  query($id: ID!, $limit: Int, $skip: Int){
    book(_id: $id){
      title
      coverUrl
      price
      author
      rating
      tags
      myComment{
        _id
        rating
        content
        stage
      }
      comments(limit: $limit, skip: $skip) {
        total
        list{
          _id
          rating
          content
          updatedAt
          commentator{
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const BOOK_COMMENTS = gql`
  query($id: ID!, $limit: Int, $skip: Int){
    book(_id: $id){
      title
      coverUrl
      rating
      comments(limit: $limit, skip: $skip) {
        total
        list{
          _id
          rating
          content
          updatedAt
          commentator{
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
