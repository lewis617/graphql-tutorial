import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { BOOK } from '../../../graphql/book';
import Rating from '../../../components/Rating';
import styles from './index.less';

const BookPage = ({ match }) => (
  <Query query={BOOK} variables={{ id: match.params.id }}>
    {({
      loading, error, data,
    }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const { book } = data;
      return (
        <div className={styles.page}>
          <h1 className={styles.title}>{book.title}</h1>
          <div className={styles.body}>
            <div className={styles.left}>
              <Rating rating={book.rating} size="medium" />
              <div className={styles.info}>
                {`${book.author} / ${book.price} 元`}
              </div>
            </div>
            <img src={book.coverUrl} alt={book.title} />
          </div>
        </div>
      );
    }}
  </Query>
);

BookPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default BookPage;
