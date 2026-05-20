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

const alerts = {
  success: uploadSuccessTemplate,
  error: uploadErrorTemplate,
  dataError: dataLoadErrorTemplate,
};

const showAlert = (type = 'success') => {
  const alertItem = alerts[type].cloneNode(true);
  bodyElement.append(alertItem);

  if (alertItem.classList.contains('data-error')) {
    setTimeout(() => {
      alertItem.remove();
    }, 5000);
  } else {
    alertItem
      .querySelector('button')
      .addEventListener('click', () => alertItem.remove());
    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        alertItem.remove();
      }
    });
    document.addEventListener('click', (evt) => {
      if (!alertItem.querySelector('div').contains(evt.target)) {
        alertItem.remove();
      }
    });
  }
};

export { showAlert };
