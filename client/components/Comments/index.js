import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import styles from './index.less';

const Comments = ({ total, list, fetchMore }) => (
  <div className={styles.comments}>
    {list.map(item => (
      <div className={styles.comment} key={item._id}>
        <img src={item.commentator.avatarUrl} alt={item.commentator.name} />
        <div className={styles.rightContainer}>
          <div className={styles.nameRating}>
            <strong>{item.commentator.name}</strong>
            <Rating rating={item.rating} />
          </div>
          <div className={styles.date}>{item.updatedAt}</div>
          <div className={styles.content}>{item.content}</div>
        </div>
      </div>
    ))}
    {fetchMore
      && (total > list.length)
      && <div className={styles.fetchMore} onClick={fetchMore}>显示更多</div>}
  </div>
);

Comments.propTypes = {
  total: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default Comments;
