import { genereteData } from './data.js';
import { renderGalley } from './components/gallery.js';
import { renderPhotoModal } from './components/photo-modal.js';
import { renderUploadModal } from './components/upload-modal.js';

const data = genereteData();
const picturesElement = document.querySelector('.pictures');

renderGalley(data, picturesElement);
renderPhotoModal(data, picturesElement);
renderUploadModal();
