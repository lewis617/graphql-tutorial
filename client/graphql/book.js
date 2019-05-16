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
  query($id: ID!){
    book(_id: $id){
      title
      coverUrl
      price
      author
      rating
      tags
      myComment{
        rating
        comment
        stage
      }
    }
  }
`;
