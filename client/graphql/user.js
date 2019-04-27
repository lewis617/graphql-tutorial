import gql from 'graphql-tag';

export const HELLO = gql`{hello}`;

export const FOLLOW = gql`
  mutation($id: ID!) {
    follow(user: {_id: $id}){isFollowing}
  }
`;

export const USER = gql`
  query ($id: ID!){
    user(user:{_id:$id}){
      name
      avatarUrl
      location
      intro
      isFollowing
      following(limit: 5){
        name
        avatarUrl
      }
      followingCount
      followersCount
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    currentUser{name _id}
  }
`;

export const LOGIN = gql`
  query($user: LoginInput!){
    login(user: $user){
      token
    }
  }
`;
