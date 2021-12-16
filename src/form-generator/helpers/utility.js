export const highlightError = (field, msg = 'This field is required') => {
  field.classList.add('border-danger');
  //create error highlight elem
  const errorElement = document.createElement('span');
  errorElement.setAttribute('name', 'validationMsg');
  errorElement.classList.add('text-danger');
  errorElement.style.fontSize = '14px';
  errorElement.innerHTML = msg;

  field.onclick = () => {
    errorElement.remove();
    field.classList.remove('border-danger');
  };

  field.parentNode.insertBefore(errorElement, field.nextSibling);

  setTimeout(() => field.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
};

export const normalizeId = (id = '') => {
  return id
    .toLowerCase()
    .trim()
    .replace(/ /g, '');
};

export const setAttribute = (formsJson, fieldId = '', key, value) => {
  const forms = formsJson['forms'];

  let found = false;

  for (const form of forms) {
    for (const row of form.rows) {
      for (const col of row.columns) {
        const field = col.field;
        if (field.id === fieldId) {
          //found
          field[key] = value;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) break;
  }
};

export const removeField = (formsJson, fieldId = '') => {
  const forms = formsJson['forms'];

  let found = false;

  for (const form of forms) {
    for (const row of form.rows) {
      for (let colIndex = 0; colIndex < row.columns.length; colIndex++) {
        const col = row.columns[colIndex];
        const field = col.field;
        if (field.id === fieldId) {
          //found
          row.columns.splice(colIndex, 1);
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) break;
  }
};

export const validateInputExtra = input => {
  const type = input.type;
  const value = input.value;

  let valid = true;
  let msg = '';

  if (type === 'email') {
    valid = validateEmail(value);
    if (!valid) msg = 'Please provide a valid email address';
  }

  return { valid, msg };
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const getFormattedDate = date => {
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
};
