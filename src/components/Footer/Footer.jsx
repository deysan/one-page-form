import { Container } from '..';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.copyright}>
          ©{' '}
          <a href="https://abz.agency/" target="_blank" rel="noreferrer">
            abz.agency
          </a>{' '}
          specially for the test task
        </p>
      </Container>
    </footer>
  );
};
