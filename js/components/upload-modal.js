import { isEscapeKey } from '../util.js';
import { onUploadFormSubmit } from '../upload-validation.js';
import { onEffectChange, clearEffects, onScaleBtnClick } from '../effects.js';

const bodyElement = document.querySelector('body');
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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onInputFocus = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onInputBlur = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadModal() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInputElement.value = '';
  hashtagsElement.value = '';
  descriptionElement.value = '';
  scaleInputElement.value = '100%';
  uploadedPreviewElement.style.removeProperty('transform');
  clearEffects(uploadedPreviewElement);

  scaleButtonElements.forEach((btn) =>
    btn.removeEventListener(
      'click',
      onScaleBtnClick(scaleInputElement, uploadedPreviewElement),
    ),
  );

  formElement.removeEventListener(
    'change',
    onEffectChange(uploadedPreviewElement),
  );

  formElement.removeEventListener('submit', onUploadFormSubmit);
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

    scaleButtonElements.forEach((btn) =>
      btn.addEventListener(
        'click',
        onScaleBtnClick(scaleInputElement, uploadedPreviewElement),
      ),
    );

    formElement.addEventListener(
      'change',
      onEffectChange(uploadedPreviewElement),
    );

    formElement.addEventListener('submit', onUploadFormSubmit);
    overlayCloseElement.addEventListener('click', closeUploadModal);
    document.addEventListener('keydown', onDocumentKeydown);

    [hashtagsElement, descriptionElement].forEach((input) => {
      input.addEventListener('focus', onInputFocus);
      input.addEventListener('blur', onInputBlur);
    });
  });
};

export { renderUploadModal };
