import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentBtn from './CommentBtn';
import Rating from '../Rating';
import styles from './index.less';

class MyComment extends Component {
  state = {}

  render() {
    const { stage, rating, comment } = this.props;
    return (
      <div>
        <div className={styles.commentBtns}>
          <CommentBtn disabled={stage === 'want'}>想读</CommentBtn>
          <CommentBtn disabled={stage === 'reading'}>在读</CommentBtn>
          <CommentBtn disabled={stage === 'done'}>读过</CommentBtn>
        </div>
        {stage === 'never'
          || (
            <div className={styles.subTitle}>
              我
                {({ want: '想读', reading: '在读', done: '读过' })[stage]}
              这本书
            </div>
          )}
        {stage === 'never' || stage === 'want'
          || (
            <Rating rating={rating} />
          )}
        {stage === 'never'
          || (
            <div className={styles.comment}>
              {comment}
              （
              <span>修改</span>
              {' '}
              <span>删除</span>
              ）
            </div>
          )}
      </div>
    );
  }
}

MyComment.defaultProps = {
  rating: 0,
  comment: '',
};

MyComment.propTypes = {
  stage: PropTypes.number.isRequired,
  rating: PropTypes.number,
  comment: PropTypes.string,
};

export default MyComment;
