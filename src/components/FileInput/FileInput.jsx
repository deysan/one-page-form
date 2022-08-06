import classnames from 'classnames';
import styles from './FileInput.module.scss';
import { useController } from 'react-hook-form';

export const FileInput = ({ name, control }) => {
  const {
    field,
    formState: { errors }
  } = useController({
    control,
    name,
    rules: { required: true },
    defaultValue: undefined
  });

  const handleChange = (event) => {
    const photo = event.target.files[0];
    const url = URL.createObjectURL(photo);
    const image = new Image();

    image.onload = () => {
      photo.width = image.naturalWidth;
      photo.height = image.naturalHeight;
      field.onChange(photo);
      URL.revokeObjectURL(url);
    };
    image.src = url;
  };

  return (
    <fieldset
      className={classnames(
        styles.fieldset,
        styles.file,
        errors[name] && styles.fileError
      )}
    >
      <legend className={classnames(styles.legend, styles.visuallyHidden)}>
        Upload your photo
      </legend>
      <label htmlFor="photo">{field.value?.name || 'Upload your photo'}</label>
      <input
        ref={field.ref}
        type="file"
        id="photo"
        name="photo"
        accept="image/jpeg, image/jpg"
        onChange={handleChange}
      />
      {errors[name] && (
        <span className={styles.helper}>{errors[name].message}</span>
      )}
    </fieldset>
  );
};
