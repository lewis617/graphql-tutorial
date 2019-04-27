import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { FOLLOW, USER } from '../../graphql/user';
import styles from './index.less';

const FollowBtn = ({ isFollowing, id }) => (
  <Mutation
    mutation={FOLLOW}
    update={(cache) => {
      const { user } = cache.readQuery({ query: USER, variables: { id } });
      cache.writeQuery({
        query: USER,
        variables: { id },
        data: { user: { ...user, isFollowing: !isFollowing } },
      });
    }}
  >
    {follow => (
      <div
        className={`${styles.followBtn} ${isFollowing ? styles.unfollow : styles.follow}`}
        onClick={() => follow({ variables: { id } })}
      >
        {isFollowing ? '已关注' : '关注'}
      </div>
    )}
  </Mutation>
);

FollowBtn.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowBtn;
