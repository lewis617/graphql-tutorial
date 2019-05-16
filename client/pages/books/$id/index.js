import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { BOOK } from '../../../graphql/book';
import BookInfo from '../../../components/BookInfo';
import BookTags from '../../../components/BookTags';
import BookComments from '../../../components/BookComments';
import MyComment from '../../../components/MyComment';
import styles from './index.less';

const BookPage = ({ match }) => (
  <Query query={BOOK} variables={{ id: match.params.id, limit: 5 }}>
    {({
      loading, error, data, refetch,
    }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const { book } = data;
      return (
        <div className={styles.page}>
          <BookInfo {...book} />
          <MyComment
            {...book.myComment}
            bookId={match.params.id}
            title={book.title}
            refetch={refetch}
          />
          <BookTags {...book} />
          <BookComments {...book.comments} title={book.title} bookId={match.params.id} />
        </div>
      );
    }}
  </Query>
);

BookPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default BookPage;
