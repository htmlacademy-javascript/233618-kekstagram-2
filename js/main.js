import { genereteData } from './data.js';
import { renderGalley } from './gallery.js';
import { addGalleryEventListeners } from './photoModal.js';

const data = genereteData();
renderGalley(data);
addGalleryEventListeners(data);
