import { Button, Container, UserCard } from '..';

import styles from './Users.module.scss';
import { useUsers } from '../../hooks';

export const Users = () => {
  const { users, currentPage, totalPage, setCurrentPage } = useUsers();

  const handleClick = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  return (
    <section className={styles.users} id="users">
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Working with GET request</h2>
          <ul className={styles.list}>
            {users.map((user) => (
              <UserCard key={user.id} {...user} />
            ))}
          </ul>
          <Button
            title="Show more"
            onClick={handleClick}
            disabled={currentPage === totalPage}
          />
        </div>
      </Container>
    </section>
  );
};
