import React, { PureComponent } from 'react';
import { Link, router } from 'umi';
import { Query } from 'react-apollo';
import { CURRENT_USER } from '../../graphql/user';
import styles from './index.less';

class Nav extends PureComponent {
  state = {
    visible: false,
  }

  toggle = () => this.setState(prev => ({ visible: !prev.visible }))

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.input;
    this.toggle();
    router.push(`/books/?q=${value}`);
    this.input.value = '';
  }

  gotoLogin = () => {
    this.toggle();
    router.push('/login');
  }

  gotoUserPage = (id) => {
    this.toggle();
    router.push(`/users/${id}`);
  }

  logout = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <div className={styles.nav}>
          <Link to="/"><div className={styles.logo} /></Link>
          <div className={styles.menu} onClick={this.toggle} />
        </div>
        <div className={styles.menuContainer} style={{ display: visible ? 'block' : 'none' }}>
          <div>
            <div className={styles.close} onClick={this.toggle}>关闭</div>
            <form onSubmit={this.handleSubmit}>
              <input className={styles.search} type="text" ref={(el) => { this.input = el; }} />
            </form>
          </div>
          <Query query={CURRENT_USER}>
            {({ loading, data }) => {
              if (loading) { return 'Loading...'; }
              const { currentUser } = data || {};
              if (currentUser) {
                return (
                  <div>
                    <div
                      className={styles.userPage}
                      onClick={() => this.gotoUserPage(currentUser._id)}
                    >
                      {currentUser.name}
                    </div>
                    <div
                      className={styles.logout}
                      onClick={this.logout}
                    >
                      退出豆瓣
                    </div>
                  </div>
                );
              }
              return (
                <div>
                  <div className={styles.login} onClick={this.gotoLogin}>登录豆瓣</div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Nav;
