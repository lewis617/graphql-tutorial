import React from 'react';
import { Query } from 'react-apollo';
import { BOOKS } from '../graphql/book';
import Books from '../components/Books';
import styles from './index.less';

export default function () {
  return (
    <Query query={BOOKS} variables={{ limit: 5 }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <div className={styles.page}>
            <div className={styles.header}>最新图书</div>
            <Books books={data.books} />
          </div>
        );
      }}
    </Query>
  );
}
