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

let userID = null;

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

function loadUserInfo() {
    apiGetUserInfo()
        .then((userInfo) => {
            profileTitle.textContent = userInfo.name;
            profileDescription.textContent = userInfo.about;
            profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
            userID = userInfo._id;
            return userID;
        })
        .catch((err) => {
            console.log("Ошибка при получении информации о пользователе", err);
            alert("Произошла ошибка на сервере. Попробуйте позже");
        });
}

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    const updateName = profileNameInput.value;
    const updateAbout = profileDescriptionInputElement.value;
    const saveButton = profileForm.querySelector(
        validationConfig.submitButtonSelector
    );

    saveButton.textContent = "Сохранение...";
    saveButton.disabled = true;

    apiUpdateUserInfo(updateName, updateAbout)
        .then((data) => {
            console.log("Данные профиля обновлены:", data);
            profileTitle.textContent = updateName;
            profileDescription.textContent = updateAbout;
            closePopup(editPopup);
        })
        .catch((err) => {
            console.log("Ошибка при обновлении данных профиля", err);
            alert("Произошла ошибка на сервере. Попробуйте позже");
        })
        .finally(() => {
            saveButton.textContent = "Сохранить";
            saveButton.disabled = false;
        });
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const placeName = placeNameInput.value;
    const linkPicture = linkPlaceInput.value;
    const saveButton = newCardFormElement.querySelector(
        validationConfig.submitButtonSelector
    );

    saveButton.textContent = "Сохранение...";
    saveButton.disabled = true;

    apiAddNewCard(placeName, linkPicture)
        .then((newCard) => {
            renderCard(newCard, userID, "prepend");
            closePopup(newCardPopup);
            newCardFormElement.reset();
        })
        .catch((err) => {
            console.log("Ошибка при добавлении новой карточки", err);
            alert("Произошла ошибка при добавлении новой карточки. Попробуйте позже");
        })
        .finally(() => {
            saveButton.textContent = "Создать";
            saveButton.disabled = false;
        });
}

function renderCard(cardData, userID, method = "append") {
    const cardElement = createCard(cardData, {
        userID: userID,
        deleteCard: deleteCard,
        likeCard: likeCard,
        handleImageClick: handleImageClick,
    });

    cardsList[method](cardElement);
}

editProfileButton.addEventListener("click", () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInputElement.value = profileDescription.textContent;
    openPopup(editPopup);
});

addCardButton.addEventListener("click", () => {
    openPopup(newCardPopup);
});

function openEditAvatarPopup() {
    openPopup(popupEditAvatar);
}

function openConfirmDeletePopup(cardId, cardElement) {
    const confirmDeleteButton = confirmDeletePopup.querySelector(
        ".popup__button_type_confirm"
    );
    openPopup(confirmDeletePopup);
    confirmDeleteButton.removeEventListener("click", handleDeleteClick);
    confirmDeleteButton.addEventListener("click", handleDeleteClick);

    function handleDeleteClick(evt) {
        evt.preventDefault();
        deleteCard(cardId, cardElement);
        closePopup(confirmDeletePopup);
    }

    closeButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
            const popup = closeButton.closest(".popup");
            closePopup(popup);
        });
    });
}

avatarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const avatarUrl = avatarInput.value;
    const saveButton = avatarForm.querySelector(
        validationConfig.submitButtonSelector
    );

    saveButton.textContent = "Сохранение...";
    saveButton.disabled = true;

    if (avatarUrl) {
        apiUpdateAvatar(avatarUrl)
            .then((data) => {
                profileImage.style.backgroundImage = `url(${data.avatar})`;
                closePopup(popupEditAvatar);
            })
            .catch((err) => {
                console.log("Ошибка при обновлении аватара", err);
                alert("Не удалось обновить аватар. Попробуйте позже.");
            })
            .finally(() => {
                saveButton.textContent = "Сохранить";
                saveButton.disabled = false;
            });
    }
});

function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
}

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

window.addEventListener("DOMContentLoaded", () => {
    Promise.all([apiGetUserInfo(), getCardsFromServer()])
        .then(([userInfo, cards]) => {
            userID = userInfo._id;
            cards.forEach((card) => renderCard(card, userID));
        })
        .catch((err) => {
            console.log("Ошибка при загрузке данных", err);
            alert("Произошла ошибка на сервере. Попробуйте позже");
        });
});

avatarEditButton.addEventListener("click", openEditAvatarPopup);
profileForm.addEventListener("submit", handleFormSubmitProfile);
newCardFormElement.addEventListener("submit", handleCardFormSubmit);

enableValidation(validationConfig);

export { validationConfig, openConfirmDeletePopup };
