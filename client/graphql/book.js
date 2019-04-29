import gql from 'graphql-tag';

export const BOOKS = gql`
  query($limit: Int, $q: String, $tag: String) {
    books(limit: $limit, q: $q, tag: $tag){
      title
      coverUrl
      rating
    }
  }
`;
