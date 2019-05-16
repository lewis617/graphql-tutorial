import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import styles from './index.less';

const BookInfo = ({
  title, rating, author, coverUrl, price,
}) => (
  <div>
    <div className={styles.title}>{title}</div>
    <div className={styles.body}>
      <div className={styles.left}>
        <Rating rating={rating} size="medium" />
        <div className={styles.info}>
          {`${author} / ${price} 元`}
        </div>
      </div>
      <img src={coverUrl} alt={title} />
    </div>
  </div>
);

BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default BookInfo;
