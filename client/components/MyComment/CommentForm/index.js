import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatingRadio from './RatingRadio';
import styles from './index.less';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      comment: props.comment,
    };
  }

  render() {
    const { title, onClose, stage } = this.props;
    const { comment, rating } = this.state;
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <span onClick={onClose}>取消</span>
          <div className={styles.title}>{title}</div>
          <span onClick={onClose}>确定</span>
        </div>
        {stage === 'want' || (
          <div className={styles.ratingContainer}>
            <RatingRadio value={rating} onChange={v => this.setState({ rating: v })} />
          </div>
        )}
        <div className={styles.commentContainer}>
          <div className={styles.subTitle}>写短评</div>
          <textarea value={comment} onChange={e => this.setState({ comment: e.target.value })} />
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
};

export default CommentForm;
