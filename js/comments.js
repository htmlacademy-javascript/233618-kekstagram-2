const bigPictureElement = document.querySelector('.big-picture__social');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const loaderElement = bigPictureElement.querySelector('.social__comments-loader');
const countElement = bigPictureElement.querySelector('.social__comment-count');
const commentElement = commentsElement.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const setCommentsFeed = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const newCommentElement = commentElement.cloneNode(true);
    const avatarElement = newCommentElement.querySelector('.social__picture');
    const textElement = newCommentElement.querySelector('.social__text');

    avatarElement.src = avatar;
    avatarElement.alt = name;
    textElement.textContent = message;

    commentsFragment.append(newCommentElement);
  });

  commentsElement.append(commentsFragment);
};

const renderComments = (comments) => {
  commentsElement.innerHTML = '';
  setCommentsFeed(comments);
  loaderElement.classList.add('hidden');
  countElement.classList.add('hidden');
};

export { renderComments };
