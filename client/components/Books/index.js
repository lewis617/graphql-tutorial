import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import styles from './index.less';

const Books = ({ books, fetchMore }) => (
  <div className={styles.books}>
    {books.list.map(item => (
      <div className={styles.book} key={item.title}>
        <img src={item.coverUrl} alt={item.title} />
        <div className={styles.info}>
          <div className={styles.title}>{item.title}</div>
          <Rating rating={item.rating} />
        </div>
      </div>
    ))}
    {fetchMore
      && (books.total > books.list.length)
      && <div className={styles.fetchMore} onClick={fetchMore}>显示更多</div>}
  </div>
);

Books.propTypes = {
  books: PropTypes.array.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default Books;
