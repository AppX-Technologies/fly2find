const registerPilotFormRows = [
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
        default: 6,
        xs: 12,
        field: {
          id: 'flightOptions',
          title: 'How many flight ops would you like to see each week?',
          type: 'block-select',
          options: [0, 1, 2, 3],
          required: true,
          blockWidth: 2
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'onlyFlyWeekends',
          title: 'Only fly Jaunts on Weekends?',
          type: 'block-select',
          options: ['Yes', 'No'],
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
          id: 'flightTypes',
          title: 'Type of flights',
          type: 'block-select',
          options: ['Low & Slow', 'The very next interesting Airspace', 'Fast and Far', 'Top Jaunts'],
          required: true,
          blockWidth: 6,
          multiple: true
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 12,
        field: {
          id: 'destinationType',
          title: 'Destination type',
          type: 'block-select',
          options: ['Meals', 'Deals', 'Secrets', 'Views', 'Events', 'Pimp my Plane', 'Go with others'],
          required: true,
          blockWidth: 3,
          multiple: true
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 12,
        field: {
          id: 'whereToSend',
          title: 'How would you like to get notified?',
          type: 'block-select',
          options: ['Text', 'Email', 'Voice Call'],
          required: true,
          blockWidth: 4,
          multiple: true
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          id: 'homeAirportCode',
          title: 'Home Airport Code',
          type: 'text',
          required: true,
          maxLength: 4,
          onChange: 'capitalizeText'
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'favDest',
          title: 'Your favorite destination',
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
          id: 'bestDestinationReason',
          title: 'Why was the destination the best so far?',
          type: 'text-area',
          required: true,
          row: 3
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          id: 'tailNumber',
          title: 'Tail Number',
          type: 'text',
          required: true,
          maxLength: '6',
          onChange: 'capitalizeText'
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'cellNumber',
          title: 'TXT Cell Number (Required for Beta Testers)',
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
        xs: 12,
        field: {
          id: 'heard',
          title: 'How did you hear of us?',
          type: 'text-area',
          required: true
        }
      }
    ]
  }
];

export const pilotForm = {
  forms: [
    {
      name: 'Join as a Pilot',
      markCompulsoryFields: true,
      compact: false,
      submit: {
        name: 'Register',
        show: true,
        onSubmit: 'onRegisterPilotFormSubmit'
      },
      rows: registerPilotFormRows
    }
  ]
};
