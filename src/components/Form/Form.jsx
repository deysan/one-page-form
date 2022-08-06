import { Button, Container, FileInput, Preloader, TextField } from '..';
import { useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';
import { client } from '../../config';
import styles from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { useUsers } from '../../hooks';
import { validationSchema } from './validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';

export const Form = ({ setSuccess }) => {
  const { control, register, handleSubmit, reset, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      position_id: '1'
    },
    resolver: yupResolver(validationSchema)
  });

  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { getUsers } = useUsers();

  const isValid = useMemo(() => {
    for (const key in formState.errors) {
      return true;
    }
    return false;
  }, [formState.errors]);

  console.log(isValid);

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
                <TextField name="name" label="Your name" control={control} />
                <TextField name="email" label="Email" control={control} />
                <TextField
                  name="phone"
                  label="Phone"
                  type="tel"
                  control={control}
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
            <FileInput name="photo" control={control} />
            <Button title="Sign up" disabled={isValid} />
          </form>
        </div>
      </Container>
    </section>
  );
};
