import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatingRadio from './RatingRadio';
import styles from './index.less';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      content: props.content,
    };
  }

  render() {
    const {
      title, onCancel, onOk, stage,
    } = this.props;
    const { content, rating } = this.state;
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <span onClick={onCancel}>取消</span>
          <div className={styles.title}>{title}</div>
          <span onClick={() => onOk({ content, rating })}>确定</span>
        </div>
        {stage === 'want' || (
          <div className={styles.ratingContainer}>
            <RatingRadio value={rating} onChange={v => this.setState({ rating: v })} />
          </div>
        )}
        <div className={styles.commentContainer}>
          <div className={styles.subTitle}>写短评</div>
          <textarea value={content} onChange={e => this.setState({ content: e.target.value })} />
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired,
};

export default CommentForm;
