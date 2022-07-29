import { Container } from '..';
import Image from './success-image.svg';
import styles from './Success.module.scss';

export const Success = () => {
  return (
    <section id="signup">
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>User successfully registered</h2>
          <img
            className={styles.image}
            src={Image}
            alt="Success"
            width="328"
            height="290"
          />
        </div>
      </Container>
    </section>
  );
};
