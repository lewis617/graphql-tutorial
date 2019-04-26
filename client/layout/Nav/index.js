import React from 'react';
import { Link } from 'umi';
import styles from './index.less';

const Nav = () => (
  <div className={styles.nav}>
    <Link to="/"><div className={styles.logo} /></Link>
    <div className={styles.menu} />
  </div>
);

export default Nav;
