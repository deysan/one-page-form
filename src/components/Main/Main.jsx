import { Users } from '..';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <Users />
    </main>
  );
};
