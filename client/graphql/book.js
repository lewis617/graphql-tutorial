import gql from 'graphql-tag';

export const BOOKS = gql`
  query($limit: Int, $skip: Int, $q: String, $tag: String) {
    books(limit: $limit, skip: $skip, q: $q, tag: $tag){
      total
      list {
        title
        coverUrl
        rating
      }
    }
  }
`;
