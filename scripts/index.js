// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const addsContainer = document.querySelector('.places__list');

function addCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').innerText = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.alt;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () =>{
        deleteCallback(cardElement);
    });

    return cardElement;
}

function removeCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach((cardData) =>{
    addsContainer.append(addCard(cardData, removeCard));
});