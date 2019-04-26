import React, { Component } from 'react';
import { router } from 'umi';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import styles from './index.less';

const LOGIN = gql`
query($user: LoginInput!){
  login(user: $user){
    token
  }
}
`;
class Login extends Component {
  state = {}

  handleSubmit = async (client) => {
    const name = this.nameInput.value;
    const password = this.pswInput.value;
    if (!name || !password) { toast.error('请填写用户名或者密码'); return; }
    const { data: { login: { token } } } = await client.query({
      query: LOGIN,
      variables: { user: { name, password } },
    });
    window.localStorage.setItem('token', token);
    router.goBack();
  }

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
          <input type="text" name="name" placeholder="用户名" ref={(el) => { this.nameInput = el; }} />
          <input type="password" name="password" placeholder="密码" ref={(el) => { this.pswInput = el; }} />
        </div>
        <ApolloConsumer>
          {client => (
            <div className={styles.submit} onClick={() => this.handleSubmit(client)}>登录</div>
          )}
        </ApolloConsumer>

      </div>
    );
  }
}

export default Login;
