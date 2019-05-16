import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const CommentBtn = ({ children, disabled, onClick }) => (
  <div className={`${styles.btn} ${styles[disabled ? 'disabled' : 'abled']}`} onClick={disabled || onClick}>
    {children}
  </div>
);

CommentBtn.defaultProps = {
  disabled: false,
};

CommentBtn.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CommentBtn;
