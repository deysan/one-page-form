import { Button, Container } from '..';

import styles from './Promo.module.scss';

export const Promo = () => {
  return (
    <div className={styles.promo}>
      <Container>
        <div className={styles.content}>
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button title="Sign up" link="#signup" />
        </div>
      </Container>
    </div>
  );
};
