import { Button, Container, UserCard } from '..';

import { Preloader } from '../Preloader';
import styles from './Users.module.scss';
import { useUsers } from '../../hooks';

export const Users = () => {
  const { users, currentPage, totalPage, setCurrentPage, isLoading } =
    useUsers();

  const handleClick = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  return (
    <section className={styles.users} id="users">
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Working with GET request</h2>
          {isLoading ? (
            <Preloader />
          ) : (
            <ul className={styles.list}>
              {users.map((user) => (
                <UserCard key={user.id} {...user} />
              ))}
            </ul>
          )}
          <Button
            title="Show more"
            onClick={handleClick}
            disabled={isLoading || currentPage === totalPage}
          />
        </div>
      </Container>
    </section>
  );
};
