import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { LOGIN, CURRENT_USER } from '../../graphql/user';
import styles from './index.less';

class Login extends Component {
  state = {}

  handleSubmit = async (login) => {
    const name = this.nameInput.value;
    const password = this.pswInput.value;
    if (!name || !password) { toast.error('请填写用户名或者密码'); return; }
    const { data: { login: { token } } } = await login({
      query: LOGIN,
      variables: { user: { name, password } },
    });
    window.localStorage.setItem('token', token);
    window.history.back();
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCancel} onClick={() => window.history.back()} />
        <div className={styles.title}>登录豆瓣</div>
        <div className={styles.tips}>
          登录注册表示同意
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://accounts.douban.com/passport/agreement">豆瓣使用协议、隐私政策</a>
        </div>
        <div className={styles.formItems}>
          <input type="text" name="name" placeholder="用户名" ref={(el) => { this.nameInput = el; }} />
          <input type="password" name="password" placeholder="密码" ref={(el) => { this.pswInput = el; }} />
        </div>
        <Mutation
          mutation={LOGIN}
          update={(cache, { data: { login: { _id, name } } }) => {
            cache.writeQuery({
              query: CURRENT_USER,
              data: { currentUser: { _id, name, __typename: 'User' } },
            });
          }}
        >
          {login => (
            <div className={styles.submit} onClick={() => this.handleSubmit(login)}>登录</div>
          )}
        </Mutation>

      </div>
    );
  }
}

export default Login;
