import React from 'react';
import PropTypes from 'prop-types';
import fullStar from './fullStar.png';
import grayStar from './grayStar.png';
import styles from './index.less';

const Rating = ({ rating }) => {
  const getStar = i => ((Math.round(rating / 2) >= i) ? fullStar : grayStar);
  return (
    <div className={styles.rating}>
      <img src={getStar(1)} alt="star" />
      <img src={getStar(2)} alt="star" />
      <img src={getStar(3)} alt="star" />
      <img src={getStar(4)} alt="star" />
      <img src={getStar(5)} alt="star" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
