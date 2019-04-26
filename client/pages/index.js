import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './index.less';

export default function () {
  return (
    <Query query={gql`{hello}`}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return <h1 className={styles.normal}>{data.hello}</h1>;
      }}
    </Query>
  );
}
