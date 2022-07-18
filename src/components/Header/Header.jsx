import { NavBar, Promo } from '..';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavBar />
      <Promo />
    </header>
  );
};
