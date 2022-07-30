import { Form, Success, Users } from '..';

import styles from './Main.module.scss';
import { useState } from 'react';

export const Main = () => {
  const [success, setSuccess] = useState(false);

  return (
    <main className={styles.main}>
      <Users />
      {success ? <Success /> : <Form setSuccess={setSuccess} />}
    </main>
  );
};
