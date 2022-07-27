import { Button, Container } from '..';
import { useCallback, useEffect, useState } from 'react';

import classnames from 'classnames';
import { client } from '../../config';
import styles from './Form.module.scss';
import { validator } from '../../utils';
import { validatorConfig } from './validator-config';

export const Form = () => {
  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '1',
    file: ''
  });
  const [dirtyInput, setDirtyInput] = useState({
    name: false,
    email: false,
    phone: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setDirtyInput((prevState) => ({
      ...prevState,
      [name]: true
    }));
  };

  const getFormSubmit = () => {
    // const errors = validator(formData, validatorConfig);
    // setErrors(errors);
    // client
    //   .post('users', formData, { headers: { Token: token } })
    //   .then((response) => console.log(response));
  };

  const getToken = () => {
    client.get('token').then((response) => setToken(response.token));
  };

  const getPositions = () => {
    client
      .get('positions')
      .then((response) => setPositions(response.positions));
  };

  const validate = useCallback((data) => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  useEffect(() => {
    validate(formData);
  }, [formData, validate]);

  useEffect(() => {
    getToken();
    getPositions();
  }, []);

  return (
    <section id="signup">
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Working with POST request</h2>
          <form className={styles.form}>
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
                    errors.name && dirtyInput.name && styles.contactFieldError
                  )}
                >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classnames(
                      formData.name.length > 0 &&
                        dirtyInput.name &&
                        styles.dirty
                    )}
                  />
                  <label htmlFor="name">Your name</label>
                  {errors.name && dirtyInput.name && (
                    <span className={styles.helper}>{errors.name}</span>
                  )}
                </div>
                <div
                  className={classnames(
                    styles.contactField,
                    errors.email && dirtyInput.email && styles.contactFieldError
                  )}
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classnames(
                      formData.email.length > 0 &&
                        dirtyInput.email &&
                        styles.dirty
                    )}
                  />
                  <label htmlFor="email">Email</label>
                  {errors.email && dirtyInput.email && (
                    <span className={styles.helper}>{errors.email}</span>
                  )}
                </div>
                <div
                  className={classnames(
                    styles.contactField,
                    errors.phone && dirtyInput.phone && styles.contactFieldError
                  )}
                >
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classnames(
                      formData.phone.length > 0 &&
                        dirtyInput.phone &&
                        styles.dirty
                    )}
                  />
                  <label htmlFor="phone">Phone</label>
                  {errors.phone && (
                    <span className={styles.helper}>
                      +38 (XXX) XXX - XX - XX
                    </span>
                  )}
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
                      name="position"
                      value={position.id}
                      id={position.id}
                      defaultChecked={
                        formData.position_id === position.id.toString()
                      }
                      onChange={handleChange}
                    />
                    <label htmlFor={position.id}>{position.name}</label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <fieldset
              className={classnames(
                styles.fieldset,
                styles.file
                // styles.fileError
              )}
            >
              <legend
                className={classnames(styles.legend, styles.visuallyHidden)}
              >
                Upload your photo
              </legend>
              <label htmlFor="photo">Upload your photo</label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                // onChange={handleChange}
              />
              {/* <span className={styles.helper}>Helper text</span> */}
            </fieldset>
            <Button title="Sign up" onClick={() => getFormSubmit()} />
          </form>
        </div>
      </Container>
    </section>
  );
};
