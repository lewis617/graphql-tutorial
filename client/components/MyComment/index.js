import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { UPDATE_COMMENT, DELETE_COMMENT } from '../../graphql/comment';
import CommentBtn from './CommentBtn';
import CommentForm from './CommentForm';
import Rating from '../Rating';
import styles from './index.less';

class MyComment extends Component {
  state = { visible: false }

  setVisible = (visible) => {
    this.setState({ visible });
  }

  render() {
    const {
      stage, rating, comment, _id, refetch,
    } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <div className={styles.commentBtns}>
          <CommentBtn disabled={stage === 'want'} onClick={() => this.setVisible('want')}>想读</CommentBtn>
          <CommentBtn disabled={stage === 'reading'} onClick={() => this.setVisible('reading')}>在读</CommentBtn>
          <CommentBtn disabled={stage === 'done'} onClick={() => this.setVisible('done')}>读过</CommentBtn>
        </div>
        {
          stage && (
            <div className={styles.subTitle}>
              我
                {({ want: '想读', reading: '在读', done: '读过' })[stage]}
              这本书
            </div>
          )
        }
        {
          (stage === 'reading' || stage === 'done')
          && (<Rating rating={rating} />)
        }
        {stage && (
          <div className={styles.comment}>
            {comment}
            （
            <span onClick={() => this.setVisible(stage)}>修改</span>
            {' '}
            <Mutation mutation={DELETE_COMMENT} onCompleted={refetch}>
              {action => (
                <span
                  onClick={() => action({ variables: { comment: { _id } } })}
                >
                  删除
                </span>
              )}
            </Mutation>
            ）
          </div>
        )}
        {visible && (
          <Mutation mutation={UPDATE_COMMENT} onCompleted={refetch}>
            {action => (
              <CommentForm
                {...this.props}
                stage={visible}
                onCancel={() => this.setVisible(false)}
                onOk={(formData) => {
                  action({ variables: { comment: { ...formData, stage: visible, _id } } });
                }}
              />
            )}
          </Mutation>
        )}
      </div>
    );
  }
}

MyComment.defaultProps = {
  rating: 0,
  comment: '',
  _id: undefined,
};

MyComment.propTypes = {
  stage: PropTypes.string.isRequired,
  rating: PropTypes.number,
  comment: PropTypes.string,
  _id: PropTypes.string,
  refetch: PropTypes.func.isRequired,
};

export default MyComment;
