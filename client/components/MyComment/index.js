import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentBtn from './CommentBtn';
import CommentForm from './CommentForm';
import Rating from '../Rating';
import styles from './index.less';

class MyComment extends Component {
  state = { visible: true }

  setVisible = (visible) => {
    this.setState({ visible });
  }

  render() {
    const { stage, rating, comment } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <div className={styles.commentBtns}>
          <CommentBtn disabled={stage === 'want'} onClick={() => this.setVisible('want')}>想读</CommentBtn>
          <CommentBtn disabled={stage === 'reading'} onClick={() => this.setVisible('reading')}>在读</CommentBtn>
          <CommentBtn disabled={stage === 'done'} onClick={() => this.setVisible('done')}>读过</CommentBtn>
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
              <span onClick={() => this.setVisible(stage)}>修改</span>
              {' '}
              <span>删除</span>
              ）
            </div>
          )}
        {visible && (
          <CommentForm
            {...this.props}
            stage={visible}
            onClose={() => this.setVisible(false)}
          />
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
  stage: PropTypes.string.isRequired,
  rating: PropTypes.number,
  comment: PropTypes.string,
};

export default MyComment;
