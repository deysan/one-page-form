import { Button, Container } from '..';

import Logo from './logo.svg';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <Container>
        <nav className={styles.menu}>
          <a className={styles.logo} href="/">
            <img src={Logo} alt="Logo" width="104" height="26" />
          </a>
          <ul className={styles.items}>
            <li>
              <Button title="Users" link="#users" />
            </li>
            <li>
              <Button title="Sign up" link="#signup" />
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};
