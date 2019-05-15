import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import Rating from '../Rating';
import styles from './index.less';

const Books = ({ books, fetchMore }) => (
  <div className={styles.books}>
    {books.list.map(item => (
      <Link to={`/books/${item._id}`} className={styles.book} key={item._id}>
        <img src={item.coverUrl} alt={item.title} />
        <div className={styles.info}>
          <div className={styles.title}>{item.title}</div>
          <Rating rating={item.rating} />
        </div>
      </Link>
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
