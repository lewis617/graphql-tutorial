import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Link, router } from 'umi';
import { USER, FOLLOW } from '../../../graphql/user';
import styles from './index.less';

const User = ({ match }) => (
  <Query
    query={USER}
    variables={{ id: match.params.id }}
  >
    {({
      loading, error, data,
    }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const {
        user: {
          avatarUrl, name, location, intro, isMe,
          isFollowing, followingCount, followersCount, following,
        },
      } = data;
      const { id: userId } = match.params;
      return (
        <div className={styles.userPage}>
          <div className={styles.profileBanner}>
            <div className={styles.mask} />
            <img src={avatarUrl} alt={name} className={styles.avatar} />
          </div>
          <div className={styles.userInfo}>
            {isMe || (
              <Mutation
                mutation={FOLLOW}
                update={(cache) => {
                  const { user } = cache.readQuery({ query: USER, variables: { id: userId } });
                  cache.writeQuery({
                    query: USER,
                    variables: { id: userId },
                    data: {
                      user: {
                        ...user,
                        isFollowing: !isFollowing,
                        followersCount: user.followersCount + (isFollowing ? -1 : 1),
                      },
                    },
                  });
                }}
              >
                {follow => (
                  <div
                    className={`${styles.followBtn} ${isFollowing ? styles.unfollow : styles.follow}`}
                    onClick={() => {
                      if (localStorage.getItem('token')) { follow({ variables: { id: userId } }); } else { router.push('/login'); }
                    }}
                  >
                    {isFollowing ? '已关注' : '关注'}
                  </div>
                )}
              </Mutation>
            )}
            <div className={styles.name}>{name}</div>
            <div className={styles.location}>{location}</div>
            <div className={styles.intro}>{intro}</div>
          </div>
          <div className={styles.profileFollow}>
            <Link to={`${match.url}/following`}>
              <div className={styles.info}>
                <div className={styles.count}>{followingCount}</div>
                <div className={styles.text}>TA关注的人</div>
              </div>
              <div className={styles.avatars}>
                {following.map(item => (
                  <img src={item.avatarUrl} alt={item.name} key={item.name} />
                ))}
              </div>
            </Link>
            <Link to={`${match.url}/followers`}>
              <div className={styles.info}>
                <div className={styles.count}>{followersCount}</div>
                <div className={styles.text}>关注TA的人</div>
              </div>
            </Link>
          </div>
        </div>
      );
    }}
  </Query>
);

User.propTypes = {
  match: PropTypes.object.isRequired,
};

export default User;
