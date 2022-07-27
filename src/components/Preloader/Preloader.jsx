import styles from './Preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={styles.box}>
      <div className={styles.spinner}></div>
    </div>
  );
};
