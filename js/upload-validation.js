import { sendPhoto } from './api.js';
import { showAlert } from './components/alerts.js';

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtagsFormat = (value) => {
  if (value.length === 0) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);
  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

const validateHashtagsAmount = (value) => {
  if (value.length === 0) {
    return true;
  }

  return value.trim().split(/\s+/).length <= 5;
};

const validateHashtagsDuplication = (value) => {
  if (value.length === 0) {
    return true;
  }

  const hashtags = value
    .trim()
    .split(/\s+/)
    .map((hashtag) => hashtag.toLowerCase());
  const uniqHashtags = [];

  hashtags.forEach((hashtag) => {
    if (!uniqHashtags.includes(hashtag)) {
      uniqHashtags.push(hashtag);
    }
  });

  return hashtags.length === uniqHashtags.length;
};

const validateDescription = (value) => value.length <= 140;

const setPristine = (formElement, hashtagsElement, descriptionElement) => {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(
    hashtagsElement,
    validateHashtagsFormat,
    'Введен невалидный хэштег',
  );

  pristine.addValidator(
    hashtagsElement,
    validateHashtagsAmount,
    'Максимум 5 хэштегов',
  );

  pristine.addValidator(
    hashtagsElement,
    validateHashtagsDuplication,
    'Хэштеги повторяются',
  );

  pristine.addValidator(
    descriptionElement,
    validateDescription,
    'Максимум 140 символов',
  );

  return pristine;
};

const createOnUploadFormSubmit =
  (formElement, submitElement, pristine, onSuccess) => (event) => {
    event.preventDefault();

    if (pristine.validate()) {
      submitElement.disabled = true;
      sendPhoto(new FormData(event.target))
        .then(onSuccess)
        .then(showAlert)
        .catch(() => {
          showAlert('ERROR');
        })
        .finally(() => {
          submitElement.disabled = false;
        });
    }
  };

export { setPristine, createOnUploadFormSubmit };
