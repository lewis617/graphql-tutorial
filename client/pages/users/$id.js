import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Link } from 'umi';
import { USER, CURRENT_USER } from '../../graphql/user';
import FollowBtn from '../../components/FollowBtn';
import styles from './$id.less';

const User = ({ match }) => (
  <Query
    query={USER}
    variables={{ id: match.params.id }}
  >
    {({
      loading, error, data, client,
    }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const {
        user: {
          avatarUrl, name, location, intro,
          isFollowing, followingCount, followersCount, following,
        },
      } = data;
      const { currentUser: { _id } } = client.readQuery({ query: CURRENT_USER });
      const isMe = match.params.id === _id;
      return (
        <div className={styles.userPage}>
          <div className={styles.profileBanner}>
            <div className={styles.mask} />
            <img src={avatarUrl} alt={name} className={styles.avatar} />
          </div>
          <div className={styles.userInfo}>
            {isMe || <FollowBtn isFollowing={isFollowing} id={match.params.id} />}
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
