export const validator = (data, config) => {
  const errors = {};

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  function validate(validateMethod, data, config) {
    let statusValidate;

    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else if (typeof data === 'string') {
          statusValidate = data.trim() === '';
        } else {
          const isEmpty = (obj) => {
            for (const key in obj) {
              return false;
            }
            return true;
          };
          statusValidate = isEmpty(data);
        }
        break;
      }
      case 'minLength': {
        statusValidate = data.length <= config.value;
        break;
      }
      case 'maxLength': {
        statusValidate = data.length >= config.value;
        break;
      }
      case 'isEmail': {
        const emailRegExp =
          // eslint-disable-next-line no-control-regex
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isPhone': {
        const phoneRegExp = /[+]{0,1}380([0-9]{9})/g;
        statusValidate = !phoneRegExp.test(data);
        break;
      }
      case 'maxSize': {
        statusValidate = data.size >= config.value;
        break;
      }
      default:
        break;
    }

    if (statusValidate) return config.message;
  }

  return errors;
};
