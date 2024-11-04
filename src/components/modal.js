function handleEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) {
            closePopup(openedPopup);
        };
    };
};

function openPopup(popup) {
    popup.classList.add("popup_is-animated");
    setTimeout(() => {
        popup.classList.add("popup_is-opened");
    }, 1);
    document.addEventListener("keydown", handleEscape);
};

function closePopup(popup) {
    popup.classList.remove("popup_is-opened");

    setTimeout(() => {
        popup.classList.remove("popup_is-animated");
        document.removeEventListener("keydown", handleEscape);
    }, 600);
};

export { openPopup, closePopup };