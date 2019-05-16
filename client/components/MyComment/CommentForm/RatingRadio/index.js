import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const fullStar = 'https://img3.doubanio.com/f/talion/4e91b1ae895cdfb37d69f5c2eea33ecd2ab789e6/pics/card/ic_star_y.png';
const grayStar = 'https://img3.doubanio.com/f/talion/0eb3a627a2c8679d6a90aa5f567566b2ad659c9e/pics/card/ic_star_n.png';

const RatingRadio = ({ value, onChange }) => {
  const getStar = i => ((Math.round(value / 2) >= i) ? fullStar : grayStar);
  return (
    <div className={styles.rating}>
      <img src={getStar(1)} alt="star" onClick={() => onChange(1 * 2)} />
      <img src={getStar(2)} alt="star" onClick={() => onChange(2 * 2)} />
      <img src={getStar(3)} alt="star" onClick={() => onChange(3 * 2)} />
      <img src={getStar(4)} alt="star" onClick={() => onChange(4 * 2)} />
      <img src={getStar(5)} alt="star" onClick={() => onChange(5 * 2)} />
    </div>
  );
};

RatingRadio.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RatingRadio;
