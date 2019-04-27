import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import styles from './index.less';

const FollowUsers = ({ user, isFollowingPage, fetchMore }) => {
  const {
    _id, avatarUrl, name, followingCount, following, followersCount, followers,
  } = user;
  let text;
  let count;
  let list;
  if (isFollowingPage) {
    text = 'TA关注的人';
    count = followingCount;
    list = following;
  } else {
    text = '关注TA的人';
    count = followersCount;
    list = followers;
  }
  return (
    <div>
      <Link to={`/users/${_id}`} className={styles.peopleHeader}>
        <img src={avatarUrl} alt="" />
        <div className={styles.name}>{name}</div>
      </Link>
      <div className={styles.count}>
        {text}
        （
        {count}
        ）
      </div>
      {list.map(item => (
        <Link to={`/users/${item._id}`} key={item._id} className={styles.item}>
          <img src={item.avatarUrl} alt="" />
          <div className={styles.name}>{item.name}</div>
        </Link>
      ))}
      <div className={styles.fetchMore} onClick={fetchMore}>显示更多</div>
    </div>
  );
};

FollowUsers.propTypes = {
  user: PropTypes.object.isRequired,
  isFollowingPage: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default FollowUsers;
