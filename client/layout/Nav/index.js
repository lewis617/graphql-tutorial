import React, { PureComponent } from 'react';
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

  render() {
    const { show } = this.state;
    return (
      <div>
        <div className={styles.nav}>
          <Link to="/"><div className={styles.logo} /></Link>
          <div className={styles.menu} onClick={this.toggleMenuContainer} />
        </div>
        {show && (
          <div className={styles.menuContainer}>
            <div>
              <div className={styles.close} onClick={this.toggleMenuContainer}>关闭</div>
              <input className={styles.search} type="text" />
            </div>
            <div>
              <div className={styles.login} onClick={this.gotoLogin}>登录豆瓣</div>
            </div>
          </div>
        )}
      </div>

    );
  }
}

export default Nav;
