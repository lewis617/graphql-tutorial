import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import deepmerge from 'deepmerge';
import FollowUsers from '../../../components/FollowUsers';
import { USER_FOLLOWERS } from '../../../graphql/user';

const Followers = ({ match }) => (
  <Query
    query={USER_FOLLOWERS}
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
          isFollowingPage={false}
          fetchMore={() => {
            fetchMore({
              variables: {
                skip: data.user.followers.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => deepmerge(prev, fetchMoreResult),
            });
          }}
        />
      );
    }}
  </Query>
);

Followers.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Followers;
