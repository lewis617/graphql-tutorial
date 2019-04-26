import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const USER_QUERY = gql`
  query ($id: ID!){
    user(user:{_id:$id}){name _id}
  }
  `;

const User = ({ match }) => (
  <Query
    query={USER_QUERY}
    variables={{ id: match.params.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          <h1>Page user</h1>
          <p>{data.user.name}</p>
          <p>{data.user._id}</p>
        </div>
      );
    }}
  </Query>
);

User.propTypes = {
  match: PropTypes.object.isRequired,
};

export default User;
