const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-count');

const setCommentsFeed = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const comment = commentTemplate.cloneNode(true);
    const authorAvatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    authorAvatar.src = avatar;
    authorAvatar.alt = name;
    commentText.textContent = message;

    commentsFragment.append(comment);
  });

  commentsContainer.append(commentsFragment);
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  setCommentsFeed(comments);
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
};

export { renderComments };
