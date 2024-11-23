const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
    headers: {
        authorization: "81e6af84-be5a-4d0f-a273-9746191c2be4",
        "Content-Type": "application/json",
    },
};

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};

export const apiGetUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    }).then(handleResponse);
};

export const apiUpdateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    }).then(handleResponse);
};

export const apiGetCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers,
    }).then(handleResponse);
};

export const apiAddNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    }).then(handleResponse);
};

export const apiDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(handleResponse);
};

export const apiLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    }).then(handleResponse);
};

export const apiRemoveLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(handleResponse);
};

export const apiUpdateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl }),
    }).then(handleResponse);
};
