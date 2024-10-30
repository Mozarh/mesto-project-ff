// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';

import {initialCards} from './components/cards.js';
import {createCard, removeCard} from './components/card.js';
import  {openPopup, closePopup} from './components/modal.js';

const addsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const editFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = editFormElement.querySelector('input[name="name"]'); 
const descriptionInput = editFormElement.querySelector('input[name="description"]'); 
const newCardFormElement = document.querySelector('form[name="new-place"]');
const newCardPopup = document.querySelector('.popup_type_new-card');
const placeNameInput = newCardFormElement.querySelector('input[name="place-name"]');
const linkInput = newCardFormElement.querySelector('input[name="link"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup_type_edit');

initialCards.forEach((cardData) =>{
    const cardElement = createCard(cardData, removeCard);
    addsContainer.append(cardElement);
});

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent; 
    descriptionInput.value = profileDescription.textContent;
    openPopup(editPopup);
});

addCardButton.addEventListener('click', () => {
    openPopup(newCardPopup);
});

closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        closePopup(popup);
    });
});

popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        popups.forEach(popup => {
            if (popup.classList.contains('popup_is-opened')) {
                closePopup(popup);
            }
        });
    }
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(editPopup);
};

function createCardFormSubmit(evt) {
    evt.preventDefault();

    const placeName = placeNameInput.value;
    const linkPicture = linkInput.value;
    const newCard = createCard({ name: placeName, link: linkPicture }, removeCard);

    addsContainer.prepend(newCard);

    closePopup(newCardPopup);

    newCardFormElement.reset();
};

editFormElement.addEventListener('submit', handleFormSubmit); 

newCardFormElement.addEventListener('submit', createCardFormSubmit);











