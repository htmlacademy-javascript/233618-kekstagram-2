import { isEscapeKey } from '../util.js';
import {
  createOnEffectChange,
  clearEffects,
  createOnScaleButtonClick,
} from '../effects.js';

const bodyElement = document.body;
const formElement = document.querySelector('#upload-select-image');
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

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
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
  uploadInputElement.value = '';
  hashtagsElement.value = '';
  descriptionElement.value = '';
  scaleInputElement.value = '100%';
  uploadedPreviewElement.style.removeProperty('transform');
  clearEffects(uploadedPreviewElement);

  scaleButtonElements.forEach((button) =>
    button.removeEventListener('click', onScaleButtonClick),
  );

  formElement.removeEventListener('change', onEffectChange);
  document.removeEventListener('keydown', onDocumentKeydown);

  [hashtagsElement, descriptionElement].forEach((input) => {
    input.removeEventListener('focus', onInputFocus);
    input.removeEventListener('blur', onInputBlur);
  });
}

const renderUploadModal = () => {
  uploadInputElement.addEventListener('change', () => {
    overlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    scaleButtonElements.forEach((button) =>
      button.addEventListener('click', onScaleButtonClick),
    );

    formElement.addEventListener('change', onEffectChange);
    overlayCloseElement.addEventListener('click', closeUploadModal);
    document.addEventListener('keydown', onDocumentKeydown);

    [hashtagsElement, descriptionElement].forEach((input) => {
      input.addEventListener('focus', onInputFocus);
      input.addEventListener('blur', onInputBlur);
    });
  });
};

export { closeUploadModal, renderUploadModal };
