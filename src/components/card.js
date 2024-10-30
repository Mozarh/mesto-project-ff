import { openPopup } from './modal.js';

function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').innerText = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.alt;

    cardElement.querySelector('.card__image').addEventListener('click', () => {
        const imagePopup = document.querySelector('.popup_type_image');
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name; 

        openPopup(imagePopup); 
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', () =>{
        deleteCallback(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button'); 
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });


    return cardElement;
}

function removeCard(cardElement) {
    cardElement.remove();
}

export { createCard, removeCard };


//+функция лайка и функции для работы с карточками