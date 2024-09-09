import { STATUSES } from './constants';

export const loginFormRows = [
  {
    columns: [
      {
        default: 12,
        field: {
          id: 'email',
          title: 'Email',
          type: 'text',
          variant: 'email',
          required: true
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 12,
        field: {
          id: 'password',
          title: 'Password',
          type: 'text',
          variant: 'password',
          required: true
        }
      }
    ]
  }
];

export const loginForm = {
  forms: [
    {
      name: 'login',
      markCompulsoryFields: true,
      hideFormName: true,
      compact: true,
      submit: {
        name: 'Login',
        show: true,
        onSubmit: 'onLoginFormSubmit'
      },
      rows: loginFormRows
    }
  ]
};

export const registerForm = {
  forms: [
    {
      name: 'register',
      markCompulsoryFields: true,
      hideFormName: true,
      compact: true,
      submit: {
        name: 'Register',
        show: true,
        onSubmit: 'onRegisterFormSubmit'
      },
      rows: [
        ...loginFormRows,
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'confirmPassword',
                title: 'Confirm Password',
                type: 'text',
                variant: 'password',
                required: true
              }
            }
          ]
        }
      ]
    }
  ]
};

export const forgetPaswordForm = {
  forms: [
    {
      name: 'forgotPassword',
      markCompulsoryFields: true,
      hideFormName: true,
      compact: true,
      submit: {
        name: 'Get reset email',
        show: true,
        onSubmit: 'onForgotPasswordFormSubmit'
      },
      rows: [
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'forgetPasswordEmail',
                title: 'Email',
                type: 'text',
                variant: 'email',
                required: true
              }
            }
          ]
        }
      ]
    }
  ]
};

export const completeRegisterForm = {
  forms: [
    {
      name: 'completeRegister',
      markCompulsoryFields: true,
      hideFormName: true,
      compact: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onCompleteRegisterFormSubmit'
      },
      rows: [
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'clientName',
                title: 'Your Name',
                type: 'text',
                required: true
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'phoneNumber',
                title: 'Your Phone Number',
                type: 'text',
                required: true
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'organizationId',
                title: 'Organization Id',
                type: 'text',
                required: true
              }
            }
          ]
        }
      ]
    }
  ]
};

const finishJauntFormRows = [
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          id: 'callsign',
          title: 'Call Sign',
          type: 'text',
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'code',
          title: 'Code',
          type: 'text',
          required: true
        }
      }
    ]
  },

  {
    columns: [
      {
        xs: 12,
        field: {
          id: 'experience',
          title: 'Experience',
          type: 'text-area',
          required: true,
          row: 3
        }
      }
    ]
  }
];

export const finishJauntForm = {
  forms: [
    {
      name: 'Finish Jaunt',
      markCompulsoryFields: true,
      compact: false,
      submit: {
        name: 'Finish',
        show: true,
        onSubmit: 'onFinishJaunFormSubmit'
      },
      rows: finishJauntFormRows
    }
  ]
};

export const LOGIN_FORM_FIELDS = [
  {
    key: 'email',
    label: 'Email',
    type: 'email'
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password'
  }
];

export const REGISTER_FORM_FIELDS = [
  {
    key: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email'
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password'
  },
  {
    key: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password'
  }
];

export const FORGOT_PASSWORD_FORM_FIELDS = [
  {
    key: 'email',
    label: 'Email',
    type: 'email'
  }
];

export const ADD_JAUNT_FIELDS = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    as: 'input'
  },
  {
    key: 'brief',
    label: 'Brief',
    type: 'text',
    as: 'input'
  },
  {
    key: 'description',
    label: 'Full Description',
    type: 'textArea',
    as: 'textarea'
  },
  {
    key: 'thumbnail',
    label: 'Thumbnail'
  },
  {
    key: 'points',
    label: 'Points'
  }
];

export const EDIT_JAUNT_FIELD = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    as: 'input'
  },
  {
    key: 'status',
    label: 'Status',
    type: 'dropDown',
    as: 'select',
    options: STATUSES,
    columns: 3
  },
  {
    key: 'brief',
    label: 'Brief',
    type: 'text',
    as: 'input'
  },

  {
    key: 'description',
    label: 'Full Description',
    type: 'textArea',
    as: 'textarea'
  },
  {
    key: 'thumbnail',
    label: 'Thumbnail'
  },
  {
    key: 'points',
    label: 'Points'
  }
];

export const changePasswordForm = {
  forms: [
    {
      name: 'changePassword',
      markCompulsoryFields: true,
      hideFormName: true,
      compact: true,
      submit: {
        name: 'Change',
        show: true,
        onSubmit: 'onChangePasswordFormSubmit'
      },
      rows: [
        {
          columns: [
            {
              default: 6,
              field: {
                id: 'oldPassword',
                title: 'Old Password',
                type: 'text',
                variant: 'password',
                required: true
              }
            },
            {
              default: 6,
              field: {
                id: 'newPassword',
                title: 'New Password',
                type: 'text',
                variant: 'password',
                required: true
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 6,
              field: {
                id: 'confirmPassword',
                title: 'Confirm Password',
                type: 'text',
                variant: 'password',
                required: true
              }
            }
          ]
        }
      ]
    }
  ]
};

export const resetPasswordForm = {
  forms: [
    {
      name: 'resetPassword',
      markCompulsoryFields: true,
      hideFormName: true,
      compact: true,
      submit: {
        name: 'Reset Password',
        show: true,
        onSubmit: 'onResetPasswordFormSubmit'
      },

      rows: [
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'otp',
                title: 'OTP',
                type: 'text',
                required: true
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'newPassword',
                title: 'New Password',
                type: 'text',
                variant: 'password',
                required: true
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 12,
              field: {
                id: 'confirmPassword',
                title: 'Confirm Password',
                type: 'text',
                variant: 'password',
                required: true
              }
            }
          ]
        }
      ]
    }
  ]
};

export const formFields = [
  {
    id: 'callsign',
    label: 'Call Sign',
    type: 'text',
    required: true,
    placeholder: ''
  },
  {
    id: 'code',
    label: 'Code',
    type: 'text',
    required: true,
    placeholder: ''
  },
  {
    id: 'experience',
    label: 'Experience',
    type: 'textarea',
    required: true,
    placeholder: '',
    rows: 2
  }
];

export const pilotFormFields = [
  {
    id: 'callsign',
    label: 'Call Sign',
    type: 'text',
    required: true,
    placeholder: ''
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    placeholder: ''
  },
  {
    id: 'flightOptions',
    label: 'How many flight ops would you like to see each week?',
    type: 'block-select',
    required: true,
    options: [0, 1, 2, 3],
    multiple: false,
    blockWidth: 2
  },
  {
    id: 'onlyFlyWeekends',
    label: 'Only fly Jaunts on Weekends?',
    type: 'block-select',
    required: true,
    options: ['Yes', 'No'],
    multiple: false,
    blockWidth: 3
  },
  {
    id: 'flightTypes',
    label: 'Type of flights',
    type: 'block-select',
    required: true,
    options: ['Low & Slow', 'The very next interesting Airspace', 'Fast and Far', 'Top Jaunts'],
    multiple: true,
    blockWidth: 6
  },
  {
    id: 'destinationType',
    label: 'Destination Type',
    type: 'block-select',
    required: true,
    options: ['Meals', 'Deals', 'Secrets', 'Views', 'Events', 'Pimp my Plane', 'Go with others'],
    multiple: true,
    blockWidth: 3
  },
  {
    id: 'whereToSend',
    label: 'How would you like to get notified?',
    type: 'block-select',
    required: true,
    options: ['Text', 'Email', 'Voice Call'],
    multiple: true,
    blockWidth: 4
  },
  {
    id: 'homeAirportCode',
    label: 'Home Airport Code',
    type: 'text',
    required: true,
    maxLength: 4,
    onChange: 'capitalizeText'
  },
  {
    id: 'favDest',
    label: 'Your favorite destination',
    type: 'text',
    required: true,
    onChange: 'capitalizeText'
  },
  {
    id: 'bestDestinationReason',
    label: 'Why was the destination the best so far?',
    type: 'textarea',
    required: true
  },
  {
    id: 'tailNumber',
    label: 'Tail Number',
    type: 'text',
    required: true,
    maxLength: '6'
  },
  {
    id: 'cellNumber',
    label: 'TXT Cell Number (Required for Beta Testers)',
    type: 'text',
    required: true,
    maxLength: '6'
  },
  {
    id: 'heard',
    label: 'How did you hear of us?',
    type: 'textarea',
    required: true
  }
];

import * as yup from 'yup';

export const pilotFormSchema = yup.object().shape({
  callsign: yup.string().required('Call Sign is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  flightOptions: yup.number().required('Flight options are required'),
  // onlyFlyWeekends: yup.string().required('This field is required'),
  onlyFlyWeekends: yup
    .array()
    .of(yup.string())
    .min(1, 'This field is required')
    .required('This field is required'),
  flightTypes: yup
    .array()
    .min(1, 'At least one flight type must be selected')
    .required('Flight types are required'),
  destinationType: yup
    .array()
    .min(1, 'At least one destination type must be selected')
    .required('Destination type is required'),
  whereToSend: yup
    .array()
    .min(1, 'At least one notification channel must be selected')
    .required('Notification method is required'),
  homeAirportCode: yup
    .string()
    .matches(/^[A-Z0-9]{3,4}$/, '3 or 4 character airport code required')
    .required('Home Airport Code is required'),
  favDest: yup.string().required('Favorite destination is required'),
  bestDestinationReason: yup.string().required('Reason for best destination is required'),
  tailNumber: yup
    .string()
    .matches(/^[A-Z0-9]{6}$/, '6 character tail number required')
    .required('Tail Number is required'),
  cellNumber: yup
    .string()
    .matches(/^\d{6}$/, '6 digit cell number required')
    .required('Cell Number is required'),
  heard: yup.string().required('This field is required')
});

export const validationSchema = yup.object().shape({
  callsign: yup.string().required('Call Sign is required'),
  code: yup.string().required('Code is required'),
  experience: yup.string().required('Experience is required')
});
