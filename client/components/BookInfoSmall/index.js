import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import styles from './index.less';

const BookInfo = (props) => {
  const {
    title, rating, coverUrl, bookId,
  } = props;
  return (
    <div className={styles.container}>
      <img src={coverUrl} alt={title} />
      <Link to={`/books${bookId}`} className={styles.title}>{title}</Link>
      <span className={styles.rating}>
        {rating}
        分
      </span>
    </div>
  );
};

BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  coverUrl: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
};

export default BookInfo;
