import { getRandomNumber, getRandomItemFrom } from './util.js';

const NAMES = [
  'Александр',
  'Дмитрий',
  'Иван',
  'Сергей',
  'Андрей',
  'Михаил',
  'Николай',
  'Евгений',
  'Владимир',
  'Алексей',
  'Анна',
  'Мария',
  'Екатерина',
  'Ольга',
  'Наталья'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTOS_AMOUNT = 25;

const createRandomIdGenerator = (min, max) => {
  const usedIds = [];

  return () => {
    if (usedIds.length >= (max - min + 1)) {
      return null;
    }

    let currentId = getRandomNumber(min, max);
    while (usedIds.includes(currentId)) {
      currentId = getRandomNumber(min, max);
    }

    usedIds.push(currentId);
    return currentId;
  };
};

const getPhotoId = createRandomIdGenerator(1, PHOTOS_AMOUNT);

const genereteComment = function () {
  return {
    id: crypto.randomUUID(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomItemFrom(COMMENTS),
    name: getRandomItemFrom(NAMES)
  };
};

const generetePhoto = function () {
  return {
    id: crypto.randomUUID(),
    url: `photos/${getPhotoId()}.jpg`,
    description: 'user photo',
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 30)}, genereteComment)
  };
};

const genereteData = () => Array.from({length: PHOTOS_AMOUNT}, generetePhoto);

export { genereteData };
