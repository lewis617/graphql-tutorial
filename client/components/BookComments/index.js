import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import styles from './index.less';

const BookComments = ({ title, total, list }) => (
  <div>
    <div className={styles.subTitle}>
      {title}
      的短评（
      {total}
      ）
    </div>
    <div className={styles.comments}>
      {list.map(item => (
        <div className={styles.comment}>
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
    </div>
  </div>
);

BookComments.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
};

export default BookComments;
