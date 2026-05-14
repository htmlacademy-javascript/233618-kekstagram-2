import { genereteData } from './data.js';
import { renderGalley } from './components/gallery.js';
import { renderPhotoModal } from './components/photo-modal.js';

const data = genereteData();
const picturesElement = document.querySelector('.pictures');

renderGalley(data, picturesElement);
renderPhotoModal(data, picturesElement);
