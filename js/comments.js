const bigPictureElement = document.querySelector('.big-picture__social');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const loaderElement = bigPictureElement.querySelector('.social__comments-loader');
const shownElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentElement = commentsElement.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const setCommentsFeed = (comments) => {
  comments.forEach(({avatar, message, name}, index) => {
    const newCommentElement = commentElement.cloneNode(true);
    const avatarElement = newCommentElement.querySelector('.social__picture');
    const textElement = newCommentElement.querySelector('.social__text');

    avatarElement.src = avatar;
    avatarElement.alt = name;
    textElement.textContent = message;

    if (index > 4) {
      newCommentElement.classList.add('hidden');
    }

    commentsFragment.append(newCommentElement);
  });

  commentsElement.append(commentsFragment);
};

const onLoaderClick = () => {
  const hiddenComments = commentsElement.querySelectorAll('.social__comment.hidden');
  const batch = [...hiddenComments].slice(0, 5);

  batch.forEach((comment) => comment.classList.remove('hidden'));
  const updatedCount = Number(shownElement.textContent) + batch.length;
  shownElement.textContent = updatedCount;

  if (hiddenComments.length <= 5) {
    loaderElement.classList.add('hidden');
  }
};

const renderComments = (comments) => {
  commentsElement.innerHTML = '';
  loaderElement.classList.remove('hidden');
  setCommentsFeed(comments);

  if (comments.length > 5) {
    loaderElement.addEventListener('click', onLoaderClick);
  } else {
    loaderElement.classList.add('hidden');
  }
};

export { renderComments, onLoaderClick };
