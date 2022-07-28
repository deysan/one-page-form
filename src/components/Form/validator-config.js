export const validatorConfig = {
  name: {
    isRequired: {
      message: 'Name is required'
    },
    minLength: {
      message: 'Name must contain at least 2 characters',
      value: 2
    },
    maxLength: {
      message: 'Name must contain no more than 60 characters',
      value: 60
    }
  },
  email: {
    isRequired: {
      message: 'Email is required'
    },
    minLength: {
      message: 'Email must be at least 2 characters',
      value: 2
    },
    maxLength: {
      message: 'Email must be no more than 100 characters',
      value: 100
    },
    isEmail: {
      message: 'Email entered incorrectly'
    }
  },
  phone: {
    isRequired: {
      message: 'Phone is required'
    },
    isPhone: {
      message: 'Phone entered incorrectly'
    }
  },
  position_id: {
    isRequired: {
      message: 'Position is required'
    }
  },
  photo: {
    isRequired: {
      message: 'File is required'
    },
    isImage: {
      message: 'File size should not exceed 5mb and 70x70',
      value: 5242880
    }
  }
};
