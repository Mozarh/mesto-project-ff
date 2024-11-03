import { openPopup } from './modal.js';

function createCard(cardData, {deleteCard, likeCard, handleImageClick}) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const titleElement = cardElement.querySelector('.card__title');
    const imageElement = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button'); 

    titleElement.innerText = cardData.name;
    imageElement.src = cardData.link;
    imageElement.alt = cardData.alt;

    imageElement.addEventListener('click', () => handleImageClick (cardData));

    deleteButton.addEventListener('click', () => deleteCard (cardElement));

    likeButton.addEventListener('click', () => likeCard (likeButton));

    return cardElement;
};

function removeCard(cardElement) {
    cardElement.remove();
};

function handleImageClick (cardData) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name; 

    openPopup(imagePopup); 
};

function likeCard (likeButton){
    likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, removeCard, likeCard, handleImageClick };