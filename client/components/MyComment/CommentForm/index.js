import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

class CommentForm extends Component {
  state = {};

  render() {
    const {
      title, comment, rating, onClose,
    } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <span onClick={onClose}>取消</span>
          <div className={styles.title}>{title}</div>
          <span onClick={onClose}>确定</span>
        </div>
        <div>{rating}</div>
        <div>{comment}</div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentForm;
