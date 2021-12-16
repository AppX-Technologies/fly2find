import { normalizeId } from '../../form-generator/helpers/utility';

const serviceAddTopRow = [
  {
    columns: [
      {
        default: 12,
        xs: 12,
        field: {
          id: 'fileName',
          title: 'File Name/Number',
          type: 'text',
          required: true
        }
      }
    ]
  }
];

const serviceAddStaffTopRow = [
  {
    columns: [
      {
        default: 4,
        xs: 12,
        className: 'bg-dark py-2 text-white rounded',
        field: {
          id: 'status',
          title: 'Status',
          type: 'dropdown',
          required: true,
          disabled: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'orgName',
          title: 'Organization Name',
          type: 'dropdown',
          options: [],
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'fileName',
          title: 'File Name/Number',
          type: 'text',
          required: true
        }
      }
    ]
  }
];

const serviceEditStaffTopRow = [
  {
    columns: [
      {
        default: 4,
        xs: 12,
        className: 'bg-dark py-2 text-white rounded',
        field: {
          id: 'status',
          title: 'Status',
          type: 'dropdown',
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'orgName',
          title: 'Organization Name',
          type: 'dropdown',
          options: [],
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'fileName',
          title: 'File Name/Number',
          type: 'text',
          required: true
        }
      }
    ]
  }
];

const serviceAddRows = [
  {
    columns: [
      {
        default: 12,
        xs: 12,
        field: {
          id: 'folioNum',
          title: 'Folio #',
          type: 'multi-text',
          required: true
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 4,
        xs: 12,
        field: {
          id: 'propertyAddress',
          title: 'Property Address',
          type: 'text',
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'propertyCity',
          title: 'City',
          type: 'datalist-text',
          onChange: 'updateCounty',
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'county',
          title: 'County',
          type: 'datalist-text',
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
          id: 'propertyState',
          title: 'State',
          type: 'text',
          required: true,
          value: 'FL'
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'propertyZipCode',
          title: 'Zip Code',
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
          id: 'legalDesc',
          title: 'Legal Description',
          type: 'text-area',
          required: false
        }
      }
    ]
  },

  {
    columns: [
      {
        default: 4,
        xs: 12,
        field: {
          id: 'buyerName',
          title: 'Buyer Name',
          type: 'text',
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'buyerPhone',
          title: 'Buyer Phone Number',
          type: 'text'
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'buyerEmail',
          title: 'Buyer Email',
          type: 'text',
          variant: 'email'
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 4,
        xs: 12,
        field: {
          id: 'sellerName',
          title: 'Seller Name',
          type: 'text',
          required: true
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'sellerPhone',
          title: 'Seller Phone Number',
          type: 'text'
        }
      },
      {
        default: 4,
        xs: 12,
        field: {
          id: 'sellerEmail',
          title: 'Seller Email',
          type: 'text',
          variant: 'email'
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
          id: 'modifications',
          title: 'Modifications / Special Instructions',
          type: 'text-area',
          required: false
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
          id: 'closingDate',
          title: 'Closing Date',
          type: 'text',
          variant: 'date',
          required: true
        }
      }
    ]
  }
];

export const formJson = role => ({
  forms: [
    {
      name: 'New Service Request',
      markCompulsoryFields: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onServiceRequestFormSubmit'
      },
      rows: [...(role === 'Client' ? serviceAddTopRow : serviceAddStaffTopRow), ...serviceAddRows]
    }
  ]
});

export const editFormJson = role => ({
  forms: [
    {
      name: 'Update Service Request',
      markCompulsoryFields: true,
      submit: {
        name: 'Update',
        show: true,
        onSubmit: 'onServiceRequestEditFormSubmit'
      },
      rows: [...(role === 'Client' ? serviceAddTopRow : serviceEditStaffTopRow), ...serviceAddRows]
    }
  ]
});

const lienSearchRows = [
  {
    columns: [
      {
        default: 12,
        xs: 12,
        field: {
          id: 'neededDate',
          title: 'Needed Date',
          type: 'text',
          variant: 'date',
          required: false
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
          id: 'rush',
          label: 'Rush',
          type: 'checkbox',
          showLabel: true
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
          id: 'rush',
          type: 'custom-html',
          html: `<p class='text-muted'>*Additional charges may apply for a Rush service</p>`
        }
      }
    ]
  }
];

const lienSearchAdminRows = [
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          type: 'custom-html',
          html: ''
        }
      },
      {
        default: 6,
        xs: 12,
        className: 'bg-dark py-2 text-white rounded',
        field: {
          id: 'status',
          title: 'Status',
          type: 'dropdown',
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
          id: 'assignedProcess',
          title: 'Assigned Processor',
          type: 'multiselect-dropdown',
          options: [],
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'estimatedTime',
          title: 'Estimated Turnaround Time',
          type: 'text',
          variant: 'date',
          required: false
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
          id: 'hardCost',
          title: 'Hard Cost',
          type: 'number',
          required: false
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'processingFee',
          title: 'Processing Fee',
          type: 'number',
          required: false
        }
      }
    ]
  }
];

export const lienSearchFormJson = {
  forms: [
    {
      name: 'Lien Search',
      markCompulsoryFields: true,
      hideFormName: true,
      submit: {
        name: 'Submit',
        show: false,
        onSubmit: 'onLienSearchFormSubmit'
      },
      rows: lienSearchRows
    }
  ]
};

export const fileRow = {
  columns: [
    {
      default: 12,
      xs: 12,
      field: {
        id: 'files',
        title: 'Files',
        type: 'file-with-check',
        multiple: true,
        defaultChecked: false
      }
    }
  ]
};

export const lienSearchAdminFormJson = {
  forms: [
    {
      name: 'Lien Search',
      markCompulsoryFields: true,
      hideFormName: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onLienSearchFormSubmit'
      },
      rows: [...lienSearchAdminRows, ...lienSearchRows, fileRow]
    }
  ]
};

export const estoppelTopRow = {
  columns: [
    {
      default: 12,
      xs: 12,
      field: {
        id: 'numHOA',
        title: 'How Many HOAs?',
        type: 'radio',
        options: ['1', '2', '3'],
        onChange: 'onHoaCountChange',
        required: true
      }
    }
  ]
};

export const estoppelBottomRows = [
  {
    columns: [
      {
        default: 12,
        xs: 12,
        field: {
          id: 'neededDate',
          title: 'Needed Date',
          type: 'text',
          variant: 'date',
          required: false
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
          id: 'rush',
          label: 'Rush',
          type: 'checkbox',
          showLabel: true
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
          id: 'rush',
          type: 'custom-html',
          html: `<p class='text-muted'>*Additional charges may apply for a Rush service</p>`
        }
      }
    ]
  }
];

export const estoppelFormJson = {
  forms: [
    {
      name: 'Estoppel',
      hideFormName: true,
      markCompulsoryFields: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onEstoppelFormSubmit'
      },
      rows: [estoppelTopRow]
    }
  ]
};

export const estoppelAdminRows = [
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          type: 'custom-html',
          html: ''
        }
      },
      {
        default: 6,
        xs: 12,
        className: 'bg-dark py-2 text-white rounded',
        field: {
          id: 'status',
          title: 'Status',
          type: 'dropdown',
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
          id: 'assignedProcess',
          title: 'Assigned Processor',
          type: 'multiselect-dropdown',
          options: [],
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'estimatedTime',
          title: 'Turnaround Time',
          type: 'text',
          variant: 'date',
          required: false
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
          id: 'hardCost',
          title: 'Hard Cost',
          type: 'number',
          required: false
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'processingFee',
          title: 'Processing Fee',
          type: 'number',
          required: false
        }
      }
    ]
  }
];

export const estoppelAdminFormJson = {
  forms: [
    {
      name: 'Estoppel',
      hideFormName: true,
      markCompulsoryFields: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onEstoppelFormSubmit'
      },
      rows: [...estoppelAdminRows, estoppelTopRow]
    }
  ]
};

const surveyAdminRows = [
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          type: 'custom-html',
          html: ''
        }
      },
      {
        default: 6,
        xs: 12,
        className: 'bg-dark py-2 text-white rounded',
        field: {
          id: 'status',
          title: 'Status',
          type: 'dropdown',
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
          id: 'assignedProcess',
          title: 'Assigned Processor',
          type: 'multiselect-dropdown',
          options: [],
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'assignedSurveyer',
          title: 'Assigned Surveyer',
          type: 'dropdown',
          options: [],
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
          id: 'surveyorPrice',
          title: 'Surveyor Price',
          type: 'number',
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: 'processingFee',
          title: 'Processing Fee',
          type: 'number',
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
          id: `listingAgentName`,
          title: `Listing Agent Name`,
          type: 'text',
          required: false
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: `listingAgentPhone`,
          title: `Listing Agent Phone`,
          type: 'text',
          required: false
        }
      }
    ]
  }
];

const surveyRows = [
  {
    columns: [
      {
        default: 6,
        xs: 12,
        field: {
          id: `hardCopy`,
          title: `Hard Copy`,
          type: 'radio',
          options: ['yes', 'no'],
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: `titleCertification`,
          title: `Title Certification`,
          type: 'text',
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
          id: `BuyerCertification`,
          title: `Buyer Certification`,
          type: 'text',
          required: true
        }
      },
      {
        default: 6,
        xs: 12,
        field: {
          id: `LenderCertification`,
          title: `Lender Certification`,
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
          id: `UnderwriterCertification`,
          type: 'dropdown',
          options: ['a', 'b'],
          title: `Underwriter Certification`,
          required: true,
          dependentElem: 'UnderwriterCertificationOther',
          showDependentOn: 'Other'
        }
      }
    ]
  },
  {
    columns: [
      {
        default: 12,
        field: {
          id: `UnderwriterCertificationOther`,
          type: 'text',
          hint: 'Other underwriter certification...'
        }
      }
    ]
  },
  ...estoppelBottomRows
];

export const surveyFormJson = {
  forms: [
    {
      name: 'Survey',
      hideFormName: true,
      markCompulsoryFields: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onSurveyFormSubmit'
      },
      rows: surveyRows
    }
  ]
};

export const surveyAdminFormJson = {
  forms: [
    {
      name: 'Survey',
      hideFormName: true,
      markCompulsoryFields: true,
      submit: {
        name: 'Submit',
        show: true,
        onSubmit: 'onSurveyFormSubmit'
      },
      rows: [...surveyAdminRows, ...surveyRows, fileRow]
    }
  ]
};

export const serviceTypeForms = {
  'Lien Search': { Client: lienSearchFormJson, Admin: lienSearchAdminFormJson, Staff: lienSearchAdminFormJson },
  Estoppel: { Client: estoppelFormJson, Admin: estoppelAdminFormJson, Staff: estoppelAdminFormJson },
  Survey: { Client: surveyFormJson, Admin: surveyAdminFormJson, Staff: surveyAdminFormJson }
};

const serviceCommentRows = [
  {
    columns: [
      {
        default: 12,
        xs: 12,
        field: {
          id: 'modifications',
          title: 'Modifications / Special Instructions',
          type: 'text-area',
          required: false
        }
      }
    ]
  }
];

export const commentFormJson = {
  forms: [
    {
      name: 'Request Change',
      markCompulsoryFields: true,
      hideFormName: true,
      submit: {
        name: 'Submit',
        show: false,
        onSubmit: 'onCommentFormSubmit'
      },
      rows: serviceCommentRows
    }
  ]
};

const serviceCancelRequestRows = (options, selectedOptions) => {
  const selectionRows = [];
  options.forEach(o => {
    if (selectedOptions.includes(o))
      selectionRows.push(
        {
          columns: [
            {
              default: 12,
              xs: 12,
              field: {
                type: 'custom-html',
                html: `<hr class='mt-0 mb-3'/>`
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
                id: normalizeId(`${o}-notes`),
                title: `${o} Notes`,
                type: 'text-area',
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
                id: normalizeId(`${o}-file`),
                title: `${o} File`,
                type: 'file',
                required: true
              }
            }
          ]
        }
      );
  });
  return [
    {
      columns: [
        {
          default: 12,
          xs: 12,
          field: {
            id: 'services',
            title: 'Select service(s) to cancel',
            type: 'block-select',
            required: true,
            multiple: true,
            options,
            blockWidth: 4,
            onChange: 'onCancelServiceSelect'
          }
        }
      ]
    },

    ...selectionRows
  ];
};

export const serviceCancelRequestFormJson = (options, selectedOptions) => ({
  forms: [
    {
      name: 'Request Cancellation',
      markCompulsoryFields: true,
      hideFormName: true,
      submit: {
        name: 'Submit',
        show: false,
        onSubmit: 'onServiceCancelRequestFormSubmit'
      },
      rows: serviceCancelRequestRows(options, selectedOptions)
    }
  ]
});

const serviceChangeRequestRows = [
  {
    columns: [
      {
        default: 12,
        xs: 12,
        field: {
          id: 'changeNotes',
          title: `Notes`,
          type: 'text-area',
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
          id: 'newClosingDate',
          title: `New Closing Date`,
          type: 'text',
          variant: 'date',
          required: true
        }
      }
    ]
  }
];

export const serviceChangeRequestFormJson = {
  forms: [
    {
      name: 'Request Change',
      markCompulsoryFields: true,
      hideFormName: true,
      submit: {
        name: 'Submit',
        show: false,
        onSubmit: 'onServiceChangeRequestFormSubmit'
      },
      rows: serviceChangeRequestRows
    }
  ]
};
