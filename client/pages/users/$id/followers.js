import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import FollowUsers from '../../../components/FollowUsers';
import { USER_FOLLOWERS } from '../../../graphql/user';

const Followers = ({ match }) => (
  <Query
    query={USER_FOLLOWERS}
    variables={{ id: match.params.id, limit: 10, skip: 0 }}
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
                offset: data.user.followers,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...prev,
                  user: {
                    ...prev.user,
                    followers: prev.user.followers.concat(fetchMoreResult.user.followers),
                  },
                };
              },
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
