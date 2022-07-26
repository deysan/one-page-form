import Placeholder from './avatar-placeholder.svg';
import styles from './UserCard.module.scss';

export const UserCard = ({ photo, name, position, email, phone }) => {
  return (
    <div className={styles.userWrapper}>
      <div className={styles.userCard}>
        <div className={styles.userImage}>
          <img
            src={photo || Placeholder}
            alt="Photo"
            width="70"
            height="70"
            aria-hidden
          />
        </div>
        <p className={styles.userName}>{name}</p>
        <div className={styles.userInfo}>
          <span>{position}</span>
          <br />
          <a className={styles.text} href={`mailto:${email}`}>
            {email}
            <span className={styles.tooltipWrapper}>
              <span className={styles.tooltipText}>{email}</span>
            </span>
          </a>
          <br />
          <a className={styles.text} href={`tel:${phone}`}>
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
};
