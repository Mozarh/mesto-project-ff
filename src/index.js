// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "./pages/index.css";

import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");

const profileForm = document.forms["edit-profile"];
const profileNameInput = profileForm.elements["name"];
const profileDescriptionInputElement = profileForm.elements["description"];
const newCardFormElement = document.forms["new-place"];
const placeNameInput = newCardFormElement.elements["place-name"];
const linkPlaceInput = newCardFormElement.elements["link"];

const newCardPopup = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
};

function renderCard(cardData, method = "append") {
    const cardElement = createCard(cardData, {
        deleteCard: removeCard,
        likeCard: likeCard,
        handleImageClick: handleImageClick,
    });
    cardsList[method](cardElement);
};

initialCards.forEach((item) => renderCard(item));

editProfileButton.addEventListener("click", () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInputElement.value = profileDescription.textContent;
    openPopup(editPopup);
});

addCardButton.addEventListener("click", () => {
    openPopup(newCardPopup);
});

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const popup = closeButton.closest(".popup");
        closePopup(popup);
    });
});

popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInputElement.value;

    closePopup(editPopup);
};

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const placeName = placeNameInput.value;
    const linkPicture = linkPlaceInput.value;
    renderCard({ name: placeName, link: linkPicture }, "prepend");

    closePopup(newCardPopup);
    newCardFormElement.reset();
};

profileForm.addEventListener("submit", handleFormSubmitProfile);

newCardFormElement.addEventListener("submit", handleCardFormSubmit);
