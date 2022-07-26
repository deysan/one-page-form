import { Button, Container, UserCard } from '..';
import { useEffect, useState } from 'react';

import styles from './Users.module.scss';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  console.log(users);
  console.log(currentPage);
  console.log(totalPage);

  useEffect(() => {
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=6`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalPage(data.total_pages);
        setUsers(data.users);
      });
  }, [currentPage]);

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
            onClick={() => setCurrentPage((prevState) => prevState + 1)}
            disabled={currentPage === totalPage}
          />
        </div>
      </Container>
    </section>
  );
};
