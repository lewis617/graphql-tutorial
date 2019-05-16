import React from 'react';
import PropTypes from 'prop-types';
import fullStar from './fullStar.png';
import grayStar from './grayStar.png';
import styles from './index.less';

const Rating = ({ rating, size }) => {
  const getStar = i => ((Math.round(rating / 2) >= i) ? fullStar : grayStar);
  return (
    <div className={`${styles.rating} ${styles[size]}`}>
      <img src={getStar(1)} alt="star" />
      <img src={getStar(2)} alt="star" />
      <img src={getStar(3)} alt="star" />
      <img src={getStar(4)} alt="star" />
      <img src={getStar(5)} alt="star" />
      <span>{(rating || 0).toFixed(1)}</span>
    </div>
  );
};

Rating.defaultProps = {
  rating: 0,
  size: 'small',
};

Rating.propTypes = {
  rating: PropTypes.number,
  size: PropTypes.string,
};

export default Rating;
