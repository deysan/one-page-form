import Placeholder from './avatar-placeholder.svg';
import styles from './UserCard.module.scss';

export const UserCard = ({ name, position, email, phone }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userImage}>
        <img src={Placeholder} alt="Photo" width="70" height="70" aria-hidden />
      </div>
      <p className={styles.userName}>{name}</p>
      <div className={styles.userInfo}>
        <span>{position}</span>
        <br />
        <a className={styles.tooltip} href={`mailto:${email}`}>
          {email}
          <span className={styles.tooltiptext}>{email}</span>
        </a>
        <br />
        <a className={styles.tooltip} href={`tel:${phone}`}>
          {phone}
          <span className={styles.tooltiptext}>{phone}</span>
        </a>
      </div>
    </div>
  );
};
