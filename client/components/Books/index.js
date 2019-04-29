import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import styles from './index.less';

const Books = ({ books }) => (
  <div className={styles.books}>
    {books.map(item => (
      <div className={styles.book} key={item.title}>
        <img src={item.coverUrl} alt={item.title} />
        <div className={styles.info}>
          <div className={styles.title}>{item.title}</div>
          <Rating rating={item.rating} />
        </div>
      </div>
    ))}
  </div>
);

Books.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Books;
