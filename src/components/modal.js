import { clearValidation } from "./validation";

function handleEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function openPopup(popup, formElement, config) {
    popup.classList.add("popup_is-animated");
    setTimeout(() => {
        popup.classList.add("popup_is-opened");
    }, 1);

    if (formElement) {
        clearValidation(formElement, config);
    }

    document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
    if (!popup || !popup.classList.contains("popup_is-opened")) {
        console.error("Попап не существует или уже закрыт");
        return;
    }

    popup.classList.remove("popup_is-opened");

    setTimeout(() => {
        popup.classList.remove("popup_is-animated");
        document.removeEventListener("keydown", handleEscape);
    }, 600);
}

export { openPopup, closePopup };