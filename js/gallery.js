const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const renderGalley = (data) => {
  data.forEach(({url, description, likes, comments}) => {
    const pictureNode = pictureTemplate.cloneNode(true);
    const imageNode = pictureNode.querySelector('.picture__img');
    const likesNode = pictureNode.querySelector('.picture__likes');
    const commentsNode = pictureNode.querySelector('.picture__comments');

    imageNode.src = url;
    imageNode.alt = description;
    likesNode.textContent = likes;
    commentsNode.textContent = comments.length;

    picturesFragment.append(pictureNode);
  });

  picturesContainer.append(picturesFragment);
};

export { renderGalley };
