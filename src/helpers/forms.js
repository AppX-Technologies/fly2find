import { STATUSES } from './constants';

const loginFormRows = [
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
