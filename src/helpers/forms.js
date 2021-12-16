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
