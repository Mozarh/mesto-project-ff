// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const addsContainer = document.querySelector('.places__list');

function addCards(initialCards, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').innerText = initialCards.name;
    cardElement.querySelector('.card__image').src = initialCards.link;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () =>{
        deleteCallback(cardElement);
    });

    return cardElement;
}

function removeCard(cardElement) {
    addsContainer.removeChild(cardElement);
}

initialCards.forEach((cardData) =>{
    addsContainer.append(addCards(cardData, removeCard));
});