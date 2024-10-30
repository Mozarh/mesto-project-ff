

function openPopup(popup) {
    popup.classList.remove('popup_is-animated'); 
    popup.classList.add('popup_is-opened'); 
};

function closePopup(popup) {
    popup.classList.add('popup_is-animated'); 
    popup.classList.remove('popup_is-opened'); 

    setTimeout(() => {
        popup.classList.remove('popup_is-animated'); 
    },600);
};


export { openPopup, closePopup} ;


//функция открытия и закрытия модального окна