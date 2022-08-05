import { Button, Container, Preloader } from '..';
import { formatNumber, validator } from '../../utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import classnames from 'classnames';
import { client } from '../../config';
import styles from './Form.module.scss';
import { useUsers } from '../../hooks';
import { validatorConfig } from './validator-config';

export const Form = ({ setSuccess }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position_id: '1'
    }
  });

  const { field: nameField } = useController({
    control,
    name: 'name',
    rules: { required: true }
  });

  const { field: emailField } = useController({
    control,
    name: 'email',
    rules: { required: true }
  });

  const { field: phoneField } = useController({
    control,
    name: 'phone',
    rules: { required: true }
  });

  const { field: photoField } = useController({
    control,
    name: 'photo',
    rules: { required: true }
  });

  const formRef = useRef(null);
  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '1',
    photo: {}
  });
  // const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const { getUsers } = useUsers();

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'photo') {
      const photo = files[0];
      const url = URL.createObjectURL(photo);
      const image = new Image();

      image.onload = () => {
        photo.width = image.naturalWidth;
        photo.height = image.naturalHeight;
        setFormData((prevState) => ({ ...prevState, photo }));
        URL.revokeObjectURL(url);
      };
      image.src = url;

      // setDirtyInput((prevState) => ({ ...prevState, photo: true }));

      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === 'email'
          ? value.trim()
          : name === 'phone'
          ? '+' + value.replace(/[^\d]/g, '')
          : value
    }));
  };

  const validate = useCallback((data) => {
    const errors = validator(data, validatorConfig);
    // setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    // const isValid = validate(formData);

    // if (!isValid) return;

    // const data = new FormData(formRef.current);
    // data.set('phone', formData.phone);

    // setLoading(true);

    // client
    //   .post('users', data, { headers: { Token: token } })
    //   .then((response) => {
    //     if (response.success === true) {
    //       setTimeout(() => {
    //         getUsers(1);
    //         setSuccess(true);
    //       }, 500);
    //     }
    //   })
    //   .finally(
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 500)
    //   );
  };

  const getToken = () => {
    client.get('token').then((response) => setToken(response.token));
  };

  const getPositions = () => {
    setLoading(true);
    client
      .get('positions')
      .then((response) => {
        setPositions(response.positions);
      })
      .finally(
        setTimeout(() => {
          setLoading(false);
        }, 500)
      );
  };

  useEffect(() => {
    validate(formData);
  }, [formData, validate]);

  useEffect(() => {
    getToken();
    getPositions();
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <section id="signup">
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Working with POST request</h2>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
          >
            <fieldset className={styles.fieldset}>
              <legend
                className={classnames(styles.legend, styles.visuallyHidden)}
              >
                Write your contacts
              </legend>
              <div className={styles.contacts}>
                <div
                  className={classnames(
                    styles.contactField,
                    errors.name && styles.contactFieldError
                  )}
                >
                  <input
                    {...nameField}
                    type="text"
                    id="name"
                    value={nameField.value}
                    className={classnames(
                      nameField.value?.length > 0 && styles.dirty
                    )}
                    onChange={(event) => {
                      nameField.onChange(event.target.value.trimStart());
                    }}
                  />
                  <label htmlFor="name">Your name</label>
                  {errors.name && (
                    <span className={styles.helper}>{errors.name.message}</span>
                  )}
                </div>
                <div
                  className={classnames(
                    styles.contactField,
                    errors.email && styles.contactFieldError
                  )}
                >
                  <input
                    {...emailField}
                    type="email"
                    id="email"
                    value={emailField.value}
                    className={classnames(
                      emailField.value?.length > 0 && styles.dirty
                    )}
                    onChange={(event) => {
                      emailField.onChange(event.target.value.trimStart());
                    }}
                  />
                  <label htmlFor="email">Email</label>
                  {errors.email && (
                    <span className={styles.helper}>
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div
                  className={classnames(
                    styles.contactField,
                    errors.phone && styles.contactFieldError
                  )}
                >
                  <input
                    {...phoneField}
                    type="tel"
                    id="phone"
                    value={formatNumber(phoneField.value || '')}
                    maxLength={13}
                    className={classnames(
                      phoneField.value?.length > 0 && styles.dirty
                    )}
                    onChange={(event) => {
                      phoneField.onChange(
                        '+' + event.target.value.replace(/[^\d]/g, '')
                      );
                    }}
                  />
                  <label htmlFor="phone">Phone</label>
                  <span className={styles.helper}>+38 (XXX) XXX - XX - XX</span>
                </div>
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Select your position</legend>
              <ul>
                {positions.map((position) => (
                  <li className={styles.select} key={position.id}>
                    <input
                      type="radio"
                      id={position.id}
                      value={position.id}
                      {...register('position_id', { required: true })}
                    />
                    <label htmlFor={position.id}>{position.name}</label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <fieldset
              className={classnames(
                styles.fieldset,
                styles.file,
                errors.photo && styles.fileError
              )}
            >
              <legend
                className={classnames(styles.legend, styles.visuallyHidden)}
              >
                Upload your photo
              </legend>
              <label htmlFor="photo">
                {photoField.value?.name || 'Upload your photo'}
              </label>
              <input
                ref={photoField.ref}
                type="file"
                id="photo"
                name="photo"
                accept="image/jpeg, image/jpg"
                onChange={(event) => {
                  photoField.onChange(event.target.files[0]);
                }}
              />
              {errors.photo && (
                <span className={styles.helper}>{errors.photo.message}</span>
              )}
            </fieldset>
            <Button
              title="Sign up"
              // disabled={!isValid}
            />
          </form>
        </div>
      </Container>
    </section>
  );
};
