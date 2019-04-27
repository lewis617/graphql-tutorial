import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './$id.less';

const USER_QUERY = gql`
  query ($id: ID!){
    user(user:{_id:$id}){
      name
      avatarUrl
      location
      intro
    }
  }
  `;

const User = ({ match }) => (
  <Query
    query={USER_QUERY}
    variables={{ id: match.params.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const {
        user: {
          avatarUrl, name, location, intro,
        },
      } = data;
      return (
        <div className={styles.userPage}>
          <div className={styles.profileBanner}>
            <div className={styles.mask} />
            <img src={avatarUrl} alt={name} className={styles.avatar} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.location}>{location}</div>
            <div className={styles.intro}>{intro}</div>
          </div>
        </div>
      );
    }}
  </Query>
);

User.propTypes = {
  match: PropTypes.object.isRequired,
};

export default User;
