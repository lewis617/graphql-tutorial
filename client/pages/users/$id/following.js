import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import deepmerge from 'deepmerge';
import FollowUsers from '../../../components/FollowUsers';
import { USER_FOLLOWING } from '../../../graphql/user';

const Following = ({ match }) => (
  <Query
    query={USER_FOLLOWING}
    variables={{ id: match.params.id, limit: 5, skip: 0 }}
  >
    {({
      loading, error, data, fetchMore,
    }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <FollowUsers
          user={data ? data.user : false}
          isFollowingPage
          fetchMore={() => {
            fetchMore({
              variables: {
                skip: data.user.following.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => deepmerge(prev, fetchMoreResult),
            });
          }}
        />
      );
    }}
  </Query>
);

Following.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Following;
