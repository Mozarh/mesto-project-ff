import "./pages/index.css";

import {
    createCard,
    deleteCard,
    likeCard,
    getCardsFromServer,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation } from "./components/validation.js";
import {
    apiGetUserInfo,
    apiUpdateUserInfo,
    apiAddNewCard,
    apiUpdateAvatar,
} from "./components/api.js";
import { renderLoading, handleSubmit } from "./components/utils.js";

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
const profileImage = document.querySelector(".profile__image");
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const avatarEditButton = document.querySelector(".profile__edit-icon");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarInput = popupEditAvatar.querySelector("#avatar-input");
const avatarForm = popupEditAvatar.querySelector("form");
const confirmDeletePopup = document.querySelector(".popup_type_confirm-delete");
const confirmDeleteButton = confirmDeletePopup.querySelector(
    ".popup__button_type_confirm"
);

let userID = null;
let cardForDelete = {};

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

function getSaveButton(form) {
    return form.querySelector(validationConfig.submitButtonSelector);
}

function openConfirmDeletePopup(cardId, cardElement) {
    cardForDelete = { id: cardId, cardElement };

    openPopup(confirmDeletePopup);

    confirmDeleteButton.removeEventListener("click", handleDeleteClick);
    confirmDeleteButton.addEventListener("click", handleDeleteClick);
}

const handleDeleteClick = (evt) => {
    evt.preventDefault();

    if (!cardForDelete.cardElement) return;

    deleteCard(cardForDelete.id)
        .then(() => {
            cardForDelete.cardElement.remove();
            closePopup(confirmDeletePopup);
            cardForDelete = {};
        })
        .catch((err) => {
            console.log("Ошибка при удалении карточки", err);
            alert("Произошла ошибка при удалении карточки. Попробуйте позже.");
        });
};

function renderCard(cardData, userID, method = "append") {
    const cardElement = createCard(cardData, {
        userID: userID,
        deleteCard: openConfirmDeletePopup,
        likeCard: likeCard,
        handleImageClick: handleImageClick,
    });

    cardsList[method](cardElement);
}

function handleCardFormSubmit(evt) {
    function makeRequest() {
        const placeName = placeNameInput.value;
        const linkPicture = linkPlaceInput.value;

        return apiAddNewCard(placeName, linkPicture).then((newCard) => {
            renderCard(newCard, userID, "prepend");
            closePopup(newCardPopup);
        });
    }
    handleSubmit(makeRequest, evt);
}

function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
}

function handleFormSubmitProfile(evt) {
    function makeRequest() {
        const updateName = profileNameInput.value;
        const updateAbout = profileDescriptionInputElement.value;

        return apiUpdateUserInfo(updateName, updateAbout).then((data) => {
            profileTitle.textContent = updateName;
            profileDescription.textContent = updateAbout;
            closePopup(editPopup);
        });
    }
    handleSubmit(makeRequest, evt);
}

function openEditAvatarPopup() {
    openPopup(popupEditAvatar);
}

avatarForm.addEventListener("submit", (event) => {
    function makeRequest() {
        const avatarUrl = avatarInput.value;

        return apiUpdateAvatar(avatarUrl).then((data) => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            closePopup(popupEditAvatar);
        });
    }
    handleSubmit(makeRequest, event);
});

function closePopupHandler(evt) {
    const popup = evt.target.closest(".popup");
    if (popup) closePopup(popup);
}

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", closePopupHandler);
});

popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

window.addEventListener("DOMContentLoaded", () => {
    Promise.all([apiGetUserInfo(), getCardsFromServer()])
        .then(([userInfo, cards]) => {
            userID = userInfo._id;
            profileTitle.textContent = userInfo.name;
            profileDescription.textContent = userInfo.about;
            profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
            cards.forEach((card) => renderCard(card, userID));
        })
        .catch((err) => {
            console.log("Ошибка при загрузке данных", err);
            alert("Произошла ошибка на сервере. Попробуйте позже");
        });
});

editProfileButton.addEventListener("click", () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInputElement.value = profileDescription.textContent;
    openPopup(editPopup);
});

addCardButton.addEventListener("click", () => {
    openPopup(newCardPopup);
});

avatarEditButton.addEventListener("click", openEditAvatarPopup);
profileForm.addEventListener("submit", handleFormSubmitProfile);
newCardFormElement.addEventListener("submit", handleCardFormSubmit);

enableValidation(validationConfig);

export { validationConfig, openConfirmDeletePopup };
