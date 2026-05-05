const bigPictureElement = document.querySelector('.big-picture__social');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const loaderElement = bigPictureElement.querySelector('.social__comments-loader');
const countElement = bigPictureElement.querySelector('.social__comment-count');
const commentElement = commentsElement.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const setCommentsFeed = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const comment = commentElement.cloneNode(true);
    const authorAvatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    authorAvatar.src = avatar;
    authorAvatar.alt = name;
    commentText.textContent = message;

    commentsFragment.append(comment);
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
