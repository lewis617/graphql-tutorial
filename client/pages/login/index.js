import React, { Component } from 'react';
import { router } from 'umi';
import styles from './index.less';

class Login extends Component {
  state = {}

  render() {
    return (
      <div>
        <div className={styles.loginCancel} onClick={() => router.goBack()} />
      </div>
    );
  }
}

export default Login;
