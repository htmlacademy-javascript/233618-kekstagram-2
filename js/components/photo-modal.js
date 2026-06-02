import { isEscapeKey, isEnterKey, isSpaceKey } from '../util.js';
import { renderComments, onLoaderClick } from './comments.js';

const bodyElement = document.body;
const photoElement = document.querySelector('.big-picture');
const closeButtonElement = photoElement.querySelector('.big-picture__cancel');
const imageElement = photoElement.querySelector('.big-picture__img img');
const likesElement = photoElement.querySelector('.likes-count');
const shownCommentsElement = photoElement.querySelector(
  '.social__comment-shown-count',
);
const totalCommentsElement = photoElement.querySelector(
  '.social__comment-total-count',
);
const descriptionElement = photoElement.querySelector('.social__caption');
const commentsLoaderElement = photoElement.querySelector(
  '.social__comments-loader',
);

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closePhotoModal();
  }
};

const onOverlayClick = (event) => {
  if (
    !photoElement.querySelector('.big-picture__preview').contains(event.target)
  ) {
    closePhotoModal();
  }
};

const onCloseButtonClick = () => closePhotoModal();

function closePhotoModal() {
  photoElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  photoElement.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPhotoModal = (event, data) => {
  if (
    event.target.matches('.picture__img') ||
    event.target.closest('.picture')
  ) {
    event.preventDefault();

    const image =
      event.type === 'click' ? event.target : event.target.querySelector('img');
    const photo = data.find((item) => image.src.match(item.url));
    const totalCommentsCount = photo.comments.length;
    const shownCommentsCount = totalCommentsCount > 5 ? 5 : totalCommentsCount;

    imageElement.src = photo.url;
    likesElement.textContent = photo.likes;
    descriptionElement.textContent = photo.description;
    shownCommentsElement.textContent = shownCommentsCount;
    totalCommentsElement.textContent = totalCommentsCount;
    renderComments(photo.comments);

    photoElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    photoElement.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const renderPhotoModal = (data, toggleElement) => {
  toggleElement.addEventListener('click', (event) =>
    openPhotoModal(event, data),
  );
  commentsLoaderElement.addEventListener('click', onLoaderClick);

  toggleElement.addEventListener('keydown', (event) => {
    if (isEnterKey(event) || isSpaceKey(event)) {
      openPhotoModal(event, data);
    }
  });

  closeButtonElement.addEventListener('click', onCloseButtonClick);
};

export { renderPhotoModal };
