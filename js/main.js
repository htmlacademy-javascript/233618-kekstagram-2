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

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomItemFrom = (items) => items[getRandomNumber(0, items.length - 1)];

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
const getCommentId = createRandomIdGenerator(1, 1000);

const genereteComment = function () {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomItemFrom(COMMENTS),
    name: getRandomItemFrom(NAMES)
  };
};

const generetePhoto = function () {
  const id = getPhotoId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'user photo',
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 30)}, genereteComment)
  };
};

const genereteData = () => Array.from({length: PHOTOS_AMOUNT}, generetePhoto);
