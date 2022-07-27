import { Button, Container } from '..';
import { useEffect, useState } from 'react';

import classnames from 'classnames';
import { client } from '../../config';
import styles from './Form.module.scss';

export const Form = () => {
  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: 1,
    file: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'position' ? Number(value) : value
    }));
  };

  const getFormSubmit = () => {
    client
      .post('users', formData, { headers: { Token: token } })
      .then((response) => console.log(response));
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
                    styles.contactField
                    // styles.contactFieldError
                  )}
                >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Your name</label>
                  {/* <span className={styles.helper}>Helper text</span> */}
                </div>
                <div
                  className={classnames(
                    styles.contactField
                    // styles.contactFieldError
                  )}
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email</label>
                  {/* <span className={styles.helper}>Helper text</span> */}
                </div>
                <div
                  className={classnames(
                    styles.contactField
                    // styles.contactFieldError
                  )}
                >
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    onChange={handleChange}
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
                      name="position"
                      value={position.id}
                      id={position.id}
                      defaultChecked={formData.position_id === position.id}
                      // checked={formData.position === position.id}
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
              <input type="file" name="photo" id="photo" accept="image/*" />
              {/* <span className={styles.helper}>Helper text</span> */}
            </fieldset>
            <Button title="Sign up" onClick={() => getFormSubmit()} />
          </form>
        </div>
      </Container>
    </section>
  );
};
