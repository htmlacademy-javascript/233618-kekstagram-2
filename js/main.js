import { fetchPhotos } from './api.js';
import { renderGalley } from './components/gallery.js';
import { renderPhotoModal } from './components/photo-modal.js';
import {
  renderUploadModal,
  closeUploadModal,
} from './components/upload-modal.js';
import { setUploadFormSubmit } from './upload-validation.js';
import { showAlert } from './components/alerts.js';

const picturesElement = document.querySelector('.pictures');

fetchPhotos()
  .then((data) => {
    renderGalley(data, picturesElement);
    renderPhotoModal(data, picturesElement);
  })
  .catch(() => showAlert('DATA_ERROR'));

renderUploadModal();
setUploadFormSubmit(closeUploadModal);
