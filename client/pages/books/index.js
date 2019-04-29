import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { BOOKS } from '../../graphql/book';
import Books from '../../components/Books';
import styles from './index.less';

const BooksPage = ({ location }) => {
  const { query: { q, tag } } = location;
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {q && (
          <span>
            关键词：
            {q}
          </span>
        )}
        {tag && (
          <span>
            分类：
            {tag}
          </span>
        )}
      </div>
      <Query query={BOOKS} variables={{ limit: 5, q, tag }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <Books books={data.books} />
          );
        }}
      </Query>
    </div>
  );
};

BooksPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default BooksPage;
