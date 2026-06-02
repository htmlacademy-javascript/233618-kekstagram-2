import { isEscapeKey } from '../util.js';
import { setPristine, createOnUploadFormSubmit } from '../upload-validation.js';
import {
  createOnEffectChange,
  clearEffects,
  createOnScaleButtonClick,
} from '../effects.js';

const bodyElement = document.body;
const formElement = document.querySelector('#upload-select-image');
const submitElement = formElement.querySelector('button[type="submit"]');
const effectPreviewElements = formElement.querySelectorAll('.effects__preview');
const hashtagsElement = formElement.querySelector('input[name="hashtags"]');
const descriptionElement = formElement.querySelector('.text__description');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const uploadInputElement = formElement.querySelector('#upload-file');
const overlayCloseElement = formElement.querySelector('#upload-cancel');
const scaleInputElement = formElement.querySelector('.scale__control--value');
const scaleButtonElements = formElement.querySelectorAll(
  'button.scale__control',
);
const uploadedPreviewElement = formElement.querySelector(
  '.img-upload__preview img',
);

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
let pristine;
let onUploadFormSubmit;

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event) && !bodyElement.querySelector('.alert')) {
    event.preventDefault();
    closeUploadModal();
  }
};

const onInputFocus = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onInputBlur = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const onScaleButtonClick = createOnScaleButtonClick(
  scaleInputElement,
  uploadedPreviewElement,
);

const onEffectChange = createOnEffectChange(uploadedPreviewElement);

function closeUploadModal() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  formElement.reset();
  uploadedPreviewElement.style.removeProperty('transform');
  clearEffects(uploadedPreviewElement);
  pristine.destroy();

  formElement.removeEventListener('submit', onUploadFormSubmit);
  formElement.removeEventListener('change', onEffectChange);
  document.removeEventListener('keydown', onDocumentKeydown);

  scaleButtonElements.forEach((button) =>
    button.removeEventListener('click', onScaleButtonClick),
  );

  [hashtagsElement, descriptionElement].forEach((input) => {
    input.removeEventListener('focus', onInputFocus);
    input.removeEventListener('blur', onInputBlur);
  });
}

const onCloseButtonClick = () => closeUploadModal();

const renderUploadModal = () => {
  uploadInputElement.addEventListener('change', () => {
    const file = uploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      const url = URL.createObjectURL(file);
      uploadedPreviewElement.src = url;
      for (const preview of effectPreviewElements) {
        preview.style.backgroundImage = `url(${url})`;
      }
    }

    overlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    pristine = setPristine(formElement, hashtagsElement, descriptionElement);
    onUploadFormSubmit = createOnUploadFormSubmit(
      formElement,
      submitElement,
      pristine,
      closeUploadModal,
    );

    formElement.addEventListener('submit', onUploadFormSubmit);
    formElement.addEventListener('change', onEffectChange);
    overlayCloseElement.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);

    scaleButtonElements.forEach((button) =>
      button.addEventListener('click', onScaleButtonClick),
    );

    [hashtagsElement, descriptionElement].forEach((input) => {
      input.addEventListener('focus', onInputFocus);
      input.addEventListener('blur', onInputBlur);
    });
  });
};

export { renderUploadModal };
