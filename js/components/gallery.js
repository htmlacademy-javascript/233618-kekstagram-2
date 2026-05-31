import { shuffle } from '../util';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const filtersElement = document.querySelector('.img-filters');
const activeFilterClass = 'img-filters__button--active';
const RANDOM_FILTER_COUNT = 10;

const filterData = (data) => {
  const filter = filtersElement
    .querySelector(`.${activeFilterClass}`)
    .id.replace('filter-', '');

  if (filter === 'default') {
    return data;
  } else if (filter === 'random') {
    shuffle(data);

    return data.slice(0, RANDOM_FILTER_COUNT);
  } else if (filter === 'discussed') {
    return data.sort(
      (itemA, itemB) => itemB.comments.length - itemA.comments.length,
    );
  }
};

const renderGalley = (data, targetElement) => {
  filterData(data.slice()).forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    imageElement.src = url;
    imageElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    picturesFragment.append(pictureElement);
  });

  const pictureElements = targetElement.querySelectorAll('.picture');
  for (const picture of pictureElements) {
    picture.remove();
  }

  targetElement.append(picturesFragment);
  filtersElement.classList.remove('img-filters--inactive');
};

const setFilterClick = (callback) => {
  filtersElement.addEventListener('click', (event) => {
    if (event.target.matches('.img-filters__button')) {
      const currentFilter = filtersElement.querySelector(
        `.${activeFilterClass}`,
      );
      currentFilter.classList.remove(activeFilterClass);
      event.target.classList.add(activeFilterClass);
      callback();
    }
  });
};

export { renderGalley, setFilterClick };
