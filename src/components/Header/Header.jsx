import { Button } from '../Button';
import { Container } from '../Container';
import Logo from './logo.svg';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.menu}>
          <a className={styles.logo} href="/">
            <img src={Logo} alt="Logo" />
          </a>
          <ul className={styles.nav}>
            <li>
              <Button title="Users" link="#users" />
            </li>
            <li>
              <Button title="Sign Up" link="#signup" />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
