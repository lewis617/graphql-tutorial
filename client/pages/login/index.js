import React, { Component } from 'react';
import { router } from 'umi';
import styles from './index.less';

class Login extends Component {
  state = {}

  render() {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCancel} onClick={() => router.goBack()} />
        <div className={styles.title}>登录豆瓣</div>
        <div className={styles.tips}>
          登录注册表示同意
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://accounts.douban.com/passport/agreement">豆瓣使用协议、隐私政策</a>
        </div>
        <div className={styles.formItems}>
          <input type="text" name="name" placeholder="用户名" />
          <input type="password" name="password" placeholder="密码" />
        </div>
        <div className={styles.submit}>登录</div>
      </div>
    );
  }
}

export default Login;
