import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import Comments from '../Comments';
import styles from './index.less';

const BookComments = (props) => {
  const {
    title, total, list, bookId,
  } = props;
  return (
    <div>
      <div className={styles.subTitle}>
        {title}
        的短评（
        {total}
        ）
      </div>
      <Comments list={list} />
      <Link to={`/books/${bookId}/comments`} className={styles.gotoComments}>查看全部</Link>
    </div>
  );
};

BookComments.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  bookId: PropTypes.string.isRequired,
};

export default BookComments;
