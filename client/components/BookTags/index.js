import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import styles from './index.less';

const BookTags = ({ tags }) => (
  <div>
    <div className={styles.subTitle}>所属标签</div>
    <div className={styles.tags}>
      {tags.map(t => <div className={styles.tag} key={t}><Link to={`/books?tag=${t}`}>{t}</Link></div>)}
    </div>
  </div>
);

BookTags.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default BookTags;
