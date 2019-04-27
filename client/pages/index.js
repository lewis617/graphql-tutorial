import React from 'react';
import { Query } from 'react-apollo';
import { HELLO } from '../graphql/user';
import styles from './index.less';

export default function () {
  return (
    <Query query={HELLO}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return <h1 className={styles.normal}>{data.hello}</h1>;
      }}
    </Query>
  );
}
