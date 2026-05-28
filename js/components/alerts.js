import { isEscapeKey } from '../util.js';

const bodyElement = document.body;
const uploadErrorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const uploadSuccessTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const dataLoadErrorTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const Alerts = {
  SUCCESS: uploadSuccessTemplate,
  ERROR: uploadErrorTemplate,
  DATA_ERROR: dataLoadErrorTemplate,
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeAlert();
  }
};

const onDocumentClick = (event) => {
  const alertElement = bodyElement.querySelector('.alert');

  if (!alertElement.querySelector('div').contains(event.target)) {
    closeAlert();
  }
};

function closeAlert() {
  bodyElement.querySelector('.alert').remove();

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showAlert = (type = 'SUCCESS') => {
  const alertElement = Alerts[type].cloneNode(true);
  alertElement.classList.add('alert');
  bodyElement.append(alertElement);

  if (alertElement.classList.contains('data-error')) {
    setTimeout(() => {
      alertElement.remove();
    }, 5000);
  } else {
    alertElement.querySelector('button').addEventListener('click', closeAlert);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  }
};

export { showAlert };
