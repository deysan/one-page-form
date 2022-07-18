import { Button, Container, UserCard } from '..';

import styles from './Users.module.scss';

export const Users = () => {
  return (
    <section className={styles.users}>
      <Container>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Working with GET request</h1>
          <ul className={styles.list}>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </ul>
          <Button title="Show more" />
        </div>
      </Container>
    </section>
  );
};
