function createCard(cardData, { deleteCard, likeCard, handleImageClick }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const titleElement = cardElement.querySelector('.card__title');
    const imageElement = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    titleElement.innerText = cardData.name;
    imageElement.src = cardData.link;
    imageElement.alt = cardData.name;

    imageElement.addEventListener('click', () => handleImageClick(cardData));

    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    likeButton.addEventListener('click', () => likeCard(likeButton));

    return cardElement;
};

function removeCard(cardElement) {
    cardElement.remove();
};

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, removeCard, likeCard };