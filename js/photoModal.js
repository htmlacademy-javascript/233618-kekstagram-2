import { isEscapeKey, isEnterKey } from './util.js';
import { renderComments } from './comments.js';

const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const photoModal = document.querySelector('.big-picture');
const photoModalCloseBtn = photoModal.querySelector('.big-picture__cancel');
const photoModalImg = photoModal.querySelector('.big-picture__img img');
const likes = photoModal.querySelector('.likes-count');
const shownComments = photoModal.querySelector('.social__comment-shown-count');
const totalComments = photoModal.querySelector('.social__comment-total-count');
const description = photoModal.querySelector('.social__caption');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function closePhotoModal() {
  photoModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const setPhotoModal = (imageNode, data) => {
  const photo = data.find((item) => imageNode.src.match(item.url));
  const totalCommentsCount = photo.comments.length;
  const shownCommentsCount = totalCommentsCount > 5 ? 5 : totalCommentsCount;

  photoModalImg.src = photo.url;
  likes.textContent = photo.likes;
  description.textContent = photo.description;
  shownComments.textContent = shownCommentsCount;
  totalComments.textContent = totalCommentsCount;
  renderComments(photo.comments);
};

const openPhotoModal = (evt, data) => {
  if (evt.target.matches('.picture__img') || evt.target.closest('.picture')) {
    evt.preventDefault();

    const image = evt.type === 'click' ? evt.target : evt.target.querySelector('img');
    setPhotoModal(image, data);
    photoModal.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const addGalleryEventListeners = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    openPhotoModal(evt, data);
  });

  picturesContainer.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openPhotoModal(evt, data);
    }
  });

  photoModalCloseBtn.addEventListener('click', closePhotoModal);
};

export { addGalleryEventListeners };
