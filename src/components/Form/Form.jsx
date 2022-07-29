import { Button, Container } from '..';
import { formatNumber, validator } from '../../utils';
import { useCallback, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';
import { client } from '../../config';
import styles from './Form.module.scss';
import { useUsers } from '../../hooks';
import { validatorConfig } from './validator-config';

export const Form = () => {
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
  const [dirtyInput, setDirtyInput] = useState({
    name: false,
    email: false,
    phone: false,
    photo: false
  });
  const [errors, setErrors] = useState({});

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

      setDirtyInput((prevState) => ({ ...prevState, photo: true }));

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

  const handleBlur = (event) => {
    const { name } = event.target;
    setDirtyInput((prevState) => ({
      ...prevState,
      [name]: true
    }));
  };

  const validate = useCallback((data) => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate(formData);

    if (!isValid) return;

    const data = new FormData(formRef.current);
    data.set('phone', formData.phone);

    client
      .post('users', data, { headers: { Token: token } })
      .then((response) => {
        if (response.success === true) {
          getUsers(1);
        }
      });
  };

  const getToken = () => {
    client.get('token').then((response) => setToken(response.token));
  };

  const getPositions = () => {
    client
      .get('positions')
      .then((response) => setPositions(response.positions));
  };

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
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
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
                    value={formData.email}
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
                    maxLength="13"
                    value={formatNumber(formData.phone)}
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
                      name="position_id"
                      id={position.id}
                      value={position.id}
                      defaultChecked={+formData.position_id === position.id}
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
                styles.file,
                errors.photo && dirtyInput.photo && styles.fileError
              )}
            >
              <legend
                className={classnames(styles.legend, styles.visuallyHidden)}
              >
                Upload your photo
              </legend>
              <label htmlFor="photo">
                {formData.photo?.name || 'Upload your photo'}
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/jpeg, image/jpg"
                onChange={handleChange}
              />
              {errors.photo && dirtyInput.photo && (
                <span className={styles.helper}>{errors.photo}</span>
              )}
            </fieldset>
            <Button title="Sign up" disabled={Object.keys(errors).length} />
          </form>
        </div>
      </Container>
    </section>
  );
};
