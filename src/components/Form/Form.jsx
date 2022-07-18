import { Button, Container } from '..';

import classnames from 'classnames';
import styles from './Form.module.scss';

export const Form = () => {
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
              <div className={styles.contact}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
                <input type="email" name="email" placeholder="Email" required />
                <p>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    required
                  />
                  <label for="phone">+38 (XXX) XXX - XX - XX</label>
                </p>
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Select your position</legend>
              <ul>
                <li className={styles.select}>
                  <input
                    type="radio"
                    name="position"
                    value="frontend"
                    id="frontend"
                    defaultChecked
                  />
                  <label htmlFor="frontend">Frontend developer</label>
                </li>
                <li className={styles.select}>
                  <input
                    type="radio"
                    name="position"
                    value="backend"
                    id="backend"
                  />
                  <label htmlFor="backend">Backend developer</label>
                </li>
                <li className={styles.select}>
                  <input
                    type="radio"
                    name="position"
                    value="designer"
                    id="designer"
                  />
                  <label htmlFor="designer">Designer</label>
                </li>
                <li className={styles.select}>
                  <input type="radio" name="position" value="qa" id="qa" />
                  <label htmlFor="qa">QA</label>
                </li>
              </ul>
            </fieldset>
            <fieldset className={classnames(styles.fieldset, styles.file)}>
              <legend
                className={classnames(styles.legend, styles.visuallyHidden)}
              >
                Upload your photo
              </legend>
              <label htmlFor="photo">Upload your photo</label>
              <input type="file" name="photo" id="photo" accept="image/*" />
            </fieldset>
            <Button title="Sign up" disabled />
          </form>
        </div>
      </Container>
    </section>
  );
};
