import classnames from 'classnames';
import { formatNumber } from '../../utils';
import styles from './TextField.module.scss';

export const TextField = ({ label, type = 'text', field, errors }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        field.onChange(value.trimStart());
        break;
      case 'email':
        field.onChange(value.trim());
        break;
      case 'phone':
        field.onChange('+' + value.replace(/[^\d]/g, ''));
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={classnames(
        styles.textField,
        errors[field.name] && styles.textFieldError
      )}
    >
      <input
        {...field}
        type={type}
        id={field.name}
        value={type === 'tel' ? formatNumber(field.value) : field.value}
        className={field.value?.length > 0 ? styles.dirty : ''}
        onChange={handleChange}
        maxLength={type === 'tel' ? 13 : ''}
      />
      <label htmlFor={field.name}>{label}</label>
      {(type === 'tel' || errors[field.name]) && (
        <span className={styles.helper}>
          {type === 'tel'
            ? '+38 (XXX) XXX - XX - XX'
            : errors[field.name].message}
        </span>
      )}
    </div>
  );
};
