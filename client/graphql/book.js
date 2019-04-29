import gql from 'graphql-tag';

export const BOOKS = gql`
  query($limit: Int) {
    books(limit: $limit){
      title
      coverUrl
      rating
    }
  }
`;
