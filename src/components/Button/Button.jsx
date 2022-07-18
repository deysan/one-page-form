import classnames from 'classnames';
import styles from './Button.module.scss';

export const Button = ({ title, onClick, disabled }) => {
  return (
    <div
      className={classnames(styles.btn, disabled && styles.disabled)}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
