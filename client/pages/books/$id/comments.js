import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import deepmerge from 'deepmerge';
import { BOOK_COMMENTS } from '../../../graphql/book';
import Comments from '../../../components/Comments';
import BookInfoSmall from '../../../components/BookInfoSmall';
import styles from './comments.less';

const CommentsPage = ({ match }) => (
  <Query query={BOOK_COMMENTS} variables={{ id: match.params.id, limit: 5, skip: 0 }}>
    {({
      loading, error, data, fetchMore,
    }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const { book } = data;
      return (
        <div className={styles.page}>
          <BookInfoSmall {...book} bookId={match.params.id} />
          <div className={styles.title}>
            全部短评（
            {book.comments.total}
            ）
          </div>
          <div className={styles.commentsContainer}>
            <Comments
              {...book.comments}
              fetchMore={() => {
                fetchMore({
                  variables: {
                    skip: book.comments.list.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => deepmerge(prev, fetchMoreResult),
                });
              }}
            />
          </div>
        </div>
      );
    }}
  </Query>
);

CommentsPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CommentsPage;
