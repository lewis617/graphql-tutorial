import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, router } from 'umi';
import styles from './index.less';

class Nav extends PureComponent {
  state = {
    show: false,
  }

  toggleMenuContainer = () => this.setState(prev => ({ show: !prev.show }))

  gotoLogin = () => {
    this.toggleMenuContainer();
    router.push('/login');
  }

  gotoUserPage = (id) => {
    this.toggleMenuContainer();
    router.push(`/users/${id}`);
  }

  logout = () => {
    window.localStorage.removeItem('token');
    router.go(0);
  }

  render() {
    const { show } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        <div className={styles.nav}>
          <Link to="/"><div className={styles.logo} /></Link>
          <div className={styles.menu} onClick={this.toggleMenuContainer} />
        </div>
        <div className={styles.menuContainer} style={{ display: show ? 'block' : 'none' }}>
          <div>
            <div className={styles.close} onClick={this.toggleMenuContainer}>关闭</div>
            <input className={styles.search} type="text" />
          </div>

          {currentUser ? (
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
          )
            : (
              <div>
                <div className={styles.login} onClick={this.gotoLogin}>登录豆瓣</div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  currentUser: PropTypes.any.isRequired,
};

export default Nav;
