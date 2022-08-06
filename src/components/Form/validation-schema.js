import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must contain at least 2 characters')
    .max(60, 'Name must contain no more than 60 characters'),
  email: Yup.string()
    .required('Email is required')
    .min(2, 'Email must be at least 2 characters')
    .max(100, 'Email must be no more than 100 characters')
    .matches(
      // eslint-disable-next-line no-control-regex
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      'Email entered incorrectly'
    ),
  phone: Yup.string()
    .required('Phone is required')
    // eslint-disable-next-line no-useless-escape
    .matches(/^[\+]{0,1}380([0-9]{9})$/, 'Phone entered incorrectly'),
  position_id: Yup.string().required('Position is required'),
  photo: Yup.mixed()
    .required('Photo is required')
    .test(
      'maxPhotoSize',
      'The photo size must not be greater than 5 Mb',
      (value) => value?.size <= 5242880
    )
    .test(
      'minPhotoSize',
      'Minimum size of photo 70x70px',
      (value) => value?.width >= 70 && value?.height >= 70
    )
});
