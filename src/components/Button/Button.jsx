import classnames from 'classnames';
import styles from './Button.module.scss';

export const Button = ({ title, link, onClick, disabled }) => {
  return (
    <a
      className={classnames(styles.btn, disabled && styles.disabled)}
      href={link}
      onClick={onClick}
    >
      {title}
    </a>
  );
};
