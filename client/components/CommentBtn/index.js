import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const CommentBtn = ({ children, disabled }) => (
  <div className={`${styles.btn} ${styles[disabled ? 'disabled' : 'abled']}`}>
    {children}
  </div>
);

CommentBtn.defaultProps = {
  disabled: false,
};

CommentBtn.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default CommentBtn;
