import { fetchPhotos } from './api.js';
import { debounce } from './util.js';
import { renderGalley, setFilterClick } from './components/gallery.js';
import { renderPhotoModal } from './components/photo-modal.js';
import { renderUploadModal } from './components/upload-modal.js';
import { showAlert } from './components/alerts.js';

const picturesElement = document.querySelector('.pictures');

fetchPhotos()
  .then((data) => {
    renderGalley(data, picturesElement);
    renderPhotoModal(data, picturesElement);
    setFilterClick(debounce(() => renderGalley(data, picturesElement)));
  })
  .catch(() => showAlert('DATA_ERROR'));

renderUploadModal();
