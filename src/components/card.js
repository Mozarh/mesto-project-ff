import {
    apiDeleteCard,
    apiLikeCard,
    apiRemoveLike,
    apiGetCards,
    apiAddNewCard,
} from "./api";
import { openConfirmDeletePopup } from "../index";

function createCard(
    cardData,
    { userID, deleteCard, likeCard, handleImageClick }
) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const titleElement = cardElement.querySelector(".card__title");
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector(".card__like-count");

    titleElement.innerText = cardData.name;
    imageElement.src = cardData.link;
    imageElement.alt = cardData.name;
    likeCount.textContent = cardData.likes.length;

    const isLiked = cardData.likes.some((like) => like._id === userID);

    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    } else {
        likeButton.classList.remove("card__like-button_is-active");
    }

    imageElement.addEventListener("click", () => handleImageClick(cardData));

    if (cardData.owner._id === userID) {
        deleteButton.style.display = "block";
        deleteButton.addEventListener("click", () =>
            openConfirmDeletePopup(cardData._id, cardElement)
        );
    } else {
        deleteButton.style.display = "none";
    }

    likeButton.addEventListener("click", () => {
        likeCard(cardData, likeButton, likeCount);
    });

    return cardElement;
}

function deleteCard(cardId, cardElement) {
    apiDeleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log("Ошибка при удалении карточек", err);
            alert("Произошла ошибка при удалении карточки. Попробуйте позже");
        });
}

function likeCard(cardData, likeButton, likeCount) {
    const cardId = cardData._id;
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    if (isLiked) {
        apiRemoveLike(cardId)
            .then((updatedCard) => {
                likeButton.classList.remove("card__like-button_is-active");
                likeCount.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log("Ошибка при снятии лайка", err);
                alert("Произошла ошибка при снятии лайка. Попробуйте позже");
            });
    } else {
        apiLikeCard(cardId)
            .then((updatedCard) => {
                likeButton.classList.add("card__like-button_is-active");
                likeCount.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log("Ошибка при добавлении лайка", err);
                alert("Произошла ошибка при добавлении лайка. Попробуйте позже");
            });
    }
}

function getCardsFromServer() {
    return apiGetCards()
        .then((cards) => {
            console.log(cards);
            return cards;
        })
        .catch((err) => {
            console.error("Ошибка при получении карточек:", err);
        });
}

function addNewCardToServer(name, link) {
    apiAddNewCard(name, link)
        .then((newCard) => {
            console.log("Карточка добавлена:", newCard);
        })
        .catch((err) => {
            console.error("Ошибка при добавлении карточки:", err);
        });
}

export {
    createCard,
    deleteCard,
    likeCard,
    getCardsFromServer,
    addNewCardToServer,
};
