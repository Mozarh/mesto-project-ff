import { apiDeleteCard, apiLikeCard, apiRemoveLike } from "./api";

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
    likeButton.classList.toggle("card__like-button_is-active", isLiked);

    imageElement.addEventListener("click", () => handleImageClick(cardData));

    if (cardData.owner._id === userID) {
        deleteButton.style.display = "block";
        deleteButton.addEventListener("click", () =>
            deleteCard(cardData._id, cardElement)
        );
    } else {
        deleteButton.style.display = "none";
    }

    likeButton.addEventListener("click", () => {
        likeCard(cardData, likeButton, likeCount);
    });

    return cardElement;
}

const deleteCard = (cardId) => {
    return apiDeleteCard(cardId)
        .then(() => {
            console.log(`Карточка с id ${cardId} удалена`);
        })
        .catch((err) => {
            console.log("Ошибка при удалении карточек", err);
            alert("Произошла ошибка при удалении карточки. Попробуйте позже");
        });
};

const likeCard = (cardData, likeButton, likeCount) => {
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
};

export { createCard, deleteCard, likeCard };