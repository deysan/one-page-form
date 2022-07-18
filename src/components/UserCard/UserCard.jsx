import Placeholder from './avatar-placeholder.svg';
import styles from './UserCard.module.scss';

export const UserCard = () => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userImage}>
        <img src={Placeholder} alt="Photo" width="70" height="70" aria-hidden />
      </div>
      <div className={styles.userName}></div>
      <div className={styles.userInfo}></div>
    </div>
  );
};
