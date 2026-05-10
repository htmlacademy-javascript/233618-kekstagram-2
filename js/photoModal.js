import { isEscapeKey, isEnterKey, isSpaceKey } from './util.js';
import { renderComments, onLoaderClick } from './comments.js';

const bodyElement = document.body;
const picturesElement = document.querySelector('.pictures');
const photoElement = document.querySelector('.big-picture');
const closeButtonElement = photoElement.querySelector('.big-picture__cancel');
const imageElement = photoElement.querySelector('.big-picture__img img');
const likesElement = photoElement.querySelector('.likes-count');
const shownCommentsElement = photoElement.querySelector('.social__comment-shown-count');
const totalCommentsElement = photoElement.querySelector('.social__comment-total-count');
const descriptionElement = photoElement.querySelector('.social__caption');
const commentsLoaderElement = photoElement.querySelector('.social__comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const onOverlayClick = (evt) => {
  if (!photoElement.querySelector('.big-picture__preview').contains(evt.target)) {
    closePhotoModal();
  }
};

function closePhotoModal() {
  photoElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  photoElement.removeEventListener('click', onOverlayClick);
  commentsLoaderElement.removeEventListener('click', onLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const setPhotoModal = (imageNode, data) => {
  const photo = data.find((item) => imageNode.src.match(item.url));
  const totalCommentsCount = photo.comments.length;
  const shownCommentsCount = totalCommentsCount > 5 ? 5 : totalCommentsCount;

  imageElement.src = photo.url;
  likesElement.textContent = photo.likes;
  descriptionElement.textContent = photo.description;
  shownCommentsElement.textContent = shownCommentsCount;
  totalCommentsElement.textContent = totalCommentsCount;
  renderComments(photo.comments);
};

const openPhotoModal = (evt, data) => {
  if (evt.target.matches('.picture__img') || evt.target.closest('.picture')) {
    evt.preventDefault();

    const image = evt.type === 'click' ? evt.target : evt.target.querySelector('img');
    setPhotoModal(image, data);
    photoElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    photoElement.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const addGalleryEventListeners = (data) => {
  picturesElement.addEventListener('click', (evt) => openPhotoModal(evt, data));

  picturesElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt) || isSpaceKey(evt)) {
      openPhotoModal(evt, data);
    }
  });

  closeButtonElement.addEventListener('click', closePhotoModal);
};

export { addGalleryEventListeners };
