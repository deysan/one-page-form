import { Button, Container, Preloader, TextField } from '..';
import { useController, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import classnames from 'classnames';
import { client } from '../../config';
import styles from './Form.module.scss';
import { useUsers } from '../../hooks';
import { validationSchema } from './validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';

export const Form = ({ setSuccess }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position_id: '1',
      photo: undefined
    },
    resolver: yupResolver(validationSchema)
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

  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { getUsers } = useUsers();

  // const handleChange = (event) => {
  //   const { name, value, files } = event.target;

  //   if (name === 'photo') {
  //     const photo = files[0];
  //     const url = URL.createObjectURL(photo);
  //     const image = new Image();

  //     image.onload = () => {
  //       photo.width = image.naturalWidth;
  //       photo.height = image.naturalHeight;
  //       setFormData((prevState) => ({ ...prevState, photo }));
  //       URL.revokeObjectURL(url);
  //     };
  //     image.src = url;

  //     // setDirtyInput((prevState) => ({ ...prevState, photo: true }));

  //     return;
  //   }

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]:
  //       name === 'email'
  //         ? value.trim()
  //         : name === 'phone'
  //         ? '+' + value.replace(/[^\d]/g, '')
  //         : value
  //   }));
  // };

  // const validate = useCallback((data) => {
  //   const errors = validator(data, validatorConfig);
  //   // setErrors(errors);

  //   return Object.keys(errors).length === 0;
  // }, []);

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    setLoading(true);

    client
      .post('users', formData, { headers: { Token: token } })
      .then((response) => {
        if (response.success === true) {
          setTimeout(() => {
            getUsers(1);
            setSuccess(true);
            reset();
          }, 500);
        }
      })
      .finally(
        setTimeout(() => {
          setLoading(false);
        }, 500)
      );
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
    getToken();
    getPositions();
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <section id="signup">
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Working with POST request</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset}>
              <legend
                className={classnames(styles.legend, styles.visuallyHidden)}
              >
                Write your contacts
              </legend>
              <div className={styles.contacts}>
                <TextField
                  label="Your name"
                  field={nameField}
                  errors={errors}
                />
                <TextField label="Email" field={emailField} errors={errors} />
                <TextField
                  label="Phone"
                  type="tel"
                  field={phoneField}
                  errors={errors}
                />
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
                      {...register('position_id', {
                        required: true
                      })}
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
                  const photo = event.target.files[0];
                  const url = URL.createObjectURL(photo);
                  const image = new Image();

                  image.onload = () => {
                    photo.width = image.naturalWidth;
                    photo.height = image.naturalHeight;
                    photoField.onChange(photo);
                    URL.revokeObjectURL(url);
                  };
                  image.src = url;
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
